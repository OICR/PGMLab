import React from "react"
import {Map} from "immutable"

import {getSource, getName, getID} from "./PathwayNormalizers.jsx"

import {Dialog, FlatButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from "material-ui/TextField"
import Checkbox from "material-ui/Checkbox"
import {List, ListItem} from "material-ui/List"

class PathwaySelectFilter extends React.Component {
  constructor(props){
    super(props)
    this.getPlaceholderText = this.getPlaceholderText.bind(this)
  }
  getPlaceholderText(){
    let reactome = this.props.filters.get("reactome")
    let uploads = this.props.filters.get("uploads")
    const and = reactome && uploads ? " and " : ""
    reactome = reactome ? "Reactome" : ""
    uploads = uploads ? "uploaded" : ""
    return `Filter ${reactome}${and}${uploads} pathways by name`
  }
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s9">
          <input
              type="text" id="textInput"
              placeholder={this.getPlaceholderText()}
              value={this.props.filters.get("text")}
              onChange={evt => this.props.updateFilters("text", evt.target.value)}
          />
        </div>
        <div className="col s3">
          <List>
            <ListItem
                leftCheckbox={
                  <Checkbox
                      label="Reactome"
                      checked={this.props.filters.get("reactome")}
                      onCheck={(evt, checked) => this.props.updateFilters("reactome", checked)}/>}
            />
            <ListItem
                leftCheckbox={
                  <Checkbox
                      label="Uploads"
                      checked={this.props.filters.get("uploads")}
                      onCheck={(evt, checked) => this.props.updateFilters("uploads", checked)}/>}
            />
          </List>
        </div>
      </div>
    )
  }
}

class PathwayRow extends React.Component {
  render(){
    return (
      <ListItem primaryText={getName(this.props.pathway)}
          leftCheckbox={
            <Checkbox
                checked={this.props.checked}
                onCheck={(evt,checked)=>this.props.onRowSelection(this.props.pathway, checked)}/>
          }
      />
    )
  }
}

class PathwayTable extends React.Component {
  constructor(props){
    super(props)
    this.onRowSelection = this.onRowSelection.bind(this)
    this.getFilteredSortedPathways = this.getFilteredSortedPathways.bind(this)
  }
  onRowSelection(pathway, checked){
    const pathwaySource = getSource(pathway)
    const pathwayID = getID(pathway)
    if ((pathwaySource == "reactome") && checked) {
      this.props.getReactomePathway(pathwayID)
        .then(pairwiseData => this.props.selectPathway(pathway, pathwaySource, pathwayID, pairwiseData, checked))
    }
    else {
      this.props.selectPathway(pathway, pathwaySource, pathwayID, pathway.get("data"), checked)
    }
  }
  getFilteredSortedPathways(){
    return this.props.pathways
      .reduce((bothPathways, pathwayMap, pathwaySource) => {
          switch (true) {
            case (pathwaySource=="user") && this.props.filters.get("uploads"):
              return bothPathways.merge(pathwayMap)
            case (pathwaySource=="reactome") && this.props.filters.get("reactome"):
              return bothPathways.merge(pathwayMap)
            default: return bothPathways
          }
        },
        Map())
      .filter(pathway =>
        getName(pathway).toLowerCase().indexOf(this.props.filters.get("text").toLowerCase()) != -1
      )
      .sort((a,b) => {
        const [aName, bName] = [a,b].map(p => getName(p).toLowerCase())
        switch (true) {
          case aName < bName: return -1
          case aName > bName: return 1
          default: return 0
        }
      })
  }
  render(){
    return (
      <List>
        {
          this.getFilteredSortedPathways()
            .valueSeq()
            .map(p =>
              <PathwayRow key={getID(p)} pathway={p}
                  onRowSelection={this.onRowSelection}
                  checked={this.props.dataspace.hasIn(["pathways", getID(p)])}/>
            )
        }
      </List>
    )
  }
}

export default class PathwaySelect extends React.Component {
  constructor(props){
    super(props)
    this.updateFilters = (filterType, newValue) => {this.props.updatePathwaysModalFilters(filterType, newValue)}
    this.openModal = () => {this.props.toggleDataspaceModal(true, "PATHWAYS")}
    this.closeModal = () => {this.props.toggleDataspaceModal(false, "PATHWAYS")}
  }
  render(){
    const openBtn = (
      <a href="#" onClick={evt => this.openModal()}>{"Add Pathways to dataspace"}</a>
    )
    const closeBtn = (
      <FlatButton label="Close" onTouchTap={evt => this.closeModal()}/>
    )
    return (
      <div>
        {openBtn}
        <Dialog
            title={"Select pathways to run PGMLab over"} titleClassName={"center-align"}
            modal={true} open={this.props.pathwaysModal.get("open")}
            actions={[closeBtn]}
        >
          <div className="row">
            <div className="col s12">
              <PathwaySelectFilter
                  filters = {this.props.pathwaysModal.get("filters")}
                  updateFilters={this.updateFilters}
              />
            </div>
            <div className="col s12" style={{maxHeight:"300px", overflowY:"scroll"}}>
              <PathwayTable
                  dataspace={this.props.dataspace}
                  pathways={this.props.pathways}
                  selectPathway={this.props.selectPathway}
                  getReactomePathway = {this.props.getReactomePathway}
                  filters = {this.props.pathwaysModal.get("filters")}
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
