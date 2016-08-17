import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import {List, ListItem} from "material-ui/List";
import {OrderedMap} from "immutable";

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
      <div className="row">
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

class PathwayTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.getFilteredPathways = this.getFilteredPathways.bind(this);
  }
  onRowSelection(selected){
    // Check filters for what is being selected, change accordingly
    this.props.selectPathways();
  }
  getFilteredPathways(){
    const test = this.props.pathways
      .reduce((bothPathways, pathwayMap) => bothPathways.merge(pathwayMap), OrderedMap())
      .toList()
      .toJS();
    console.log(test);
  }
  render(){
    this.getFilteredPathways();
    return (
      <Table multiSelectable={true} height={"330px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={true}>
          <TableRow>
            <TableHeaderColumn>
              <h6 className="black-text">{"Click to select all pathways"}</h6>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} stripedRows={true}>
          {
            [1,2,3,4].map(a => (
              <TableRow key={a}>
                <TableRowColumn>
                  {a}
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
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
            <div className="col s12">
              <PathwayTable
                  dataspace={this.props.dataspace}
                  pathways={this.props.pathways}
                  filters={this.state.filters}/>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
