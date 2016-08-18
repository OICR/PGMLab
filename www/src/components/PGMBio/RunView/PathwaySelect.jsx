import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import {List, ListItem} from "material-ui/List";
import {Map} from "immutable";

class PathwaySelectFilter extends React.Component {
  constructor(props){
    super(props);
    this.getPlaceholderText = this.getPlaceholderText.bind(this);
  }
  getPlaceholderText(){
    let {reactome, uploads} = this.props.filters;
    const and = reactome && uploads ? " and " : "";
    reactome = reactome ? "Reactome" : "";
    uploads = uploads ? "uploaded" : "";
    return `Filter ${reactome}${and}${uploads} pathways by name`;
  }
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s9">
          <input
            type="text" id="textInput"
            placeholder={this.getPlaceholderText()}
            value={this.props.filters.text}
            onChange={evt => this.props.updateFilters("text", evt.target.value)}/>
        </div>
        <div className="col s3">
          <List>
            <ListItem
              leftCheckbox={
                <Checkbox
                  label="Reactome"
                  checked={this.props.filters.reactome}
                  onCheck={(evt, checked) => this.props.updateFilters("reactome", checked)}/>}
              />
            <ListItem
              leftCheckbox={
                <Checkbox
                  label="Uploads"
                  checked={this.props.filters.uploads}
                  onCheck={(evt, checked) => this.props.updateFilters("uploads", checked)}/>}
              />
          </List>
        </div>
      </div>
    );
  }
}

// Functions for normalizing Reactome/User uploaded pathways
const getName = p => p.has("name") ? p.get("name") : p.get("filename")
const getID = p => p.has("id") ? p.get("id") : p.get("_id")

class PathwayRow extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ListItem primaryText={getName(this.props.pathway)}
          leftCheckbox={
            <Checkbox
                checked={this.props.checked}
                onCheck={(evt,checked)=>this.props.onRowSelection(this.props.pathway, checked)}/>
          }
      />
    );
  }
}

class PathwayTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.getFilteredSortedPathways = this.getFilteredSortedPathways.bind(this);
  }
  onRowSelection(pathway, checked){
    this.props.selectPathway(pathway, checked)
  }
  getFilteredSortedPathways(){
    return this.props.pathways
      .reduce((bothPathways, pathwayMap, pathwaySource) => {
          switch (true) {
            case (pathwaySource=="user") && this.props.filters.uploads:
              return bothPathways.merge(pathwayMap)
            case (pathwaySource=="reactome") && this.props.filters.reactome:
              return bothPathways.merge(pathwayMap)
            default: return bothPathways
          }
        },
        Map())
      .filter(pathway =>
        getName(pathway).toLowerCase().indexOf(this.props.filters.text.toLowerCase()) != -1
      )
      .sort((a,b) => {
        // reactome pathways have 'name', uploaded pathways have 'filename'
        const [aName, bName] = [a,b].map(p => getName(p).toLowerCase());
        switch (true) {
          case aName < bName: return -1
          case aName > bName: return 1
          default: return 0
        };
      });
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
    );
  }
}

export default class PathwaySelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      filters: {
        text: "",
        reactome: true,
        uploads: true
      }
    };
    this.updateFilters = this.updateFilters.bind(this);
  }
  updateFilters(type, newValue){
    let filters = this.state.filters;
    filters[type] = newValue;
    this.setState({filters});
  }
  render(){
    const openBtn = (
      <a href="#" onClick={evt => this.setState({open:true})}>{"Select Pathways"}</a>
    );
    const closeBtn = (
      <FlatButton label="Close" onTouchTap={evt => this.setState({open:false})}/>
    );
    return (
      <div>
        {openBtn}
        <Dialog modal={true} open={this.state.open} actions={[closeBtn]}
            title={"Select pathways to run PGMLab over"} titleClassName={"center-align"}>
          <div className="row">
            <div className="col s12">
              <PathwaySelectFilter
                  filters={this.state.filters}
                  updateFilters={this.updateFilters}/>
            </div>
            <div className="col s12" style={{maxHeight:"300px", overflowY:"scroll"}}>
              <PathwayTable
                  dataspace={this.props.dataspace}
                  pathways={this.props.pathways}
                  selectPathway={this.props.selectPathway}
                  filters={this.state.filters}/>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
