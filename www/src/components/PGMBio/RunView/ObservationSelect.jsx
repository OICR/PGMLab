import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ObservationSetTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
  }
  onRowSelection(selected){
    if (selected.length != 0) {
      const observationSet = this.props.observations.toList().get(selected[0]);
      this.props.selectObservationSet(observationSet);
    }
  }
  render(){
    return (
      <Table multiSelectable={false} height={"330px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <h6 className="center-align black-text">{"Observation Sets"}</h6>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} stripedRows={true}>
          {
            this.props.observations.valueSeq()
              .map(obsSet => (
                <TableRow
                    key={obsSet.get("_id")}
                    selected={obsSet.get("_id") == this.props.dataspace.getIn(["observationSet","_id"])}>
                  <TableRowColumn>
                    {obsSet.get("filename")}
                  </TableRowColumn>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    );
  }
}

class ObservationTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
  }
  onRowSelection(selected){
    this.props.selectObservations(selected);
  }
  render(){
    return (
      <Table multiSelectable={true} height={"330px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <h6 className="center-align black-text">{this.props.dataspace.getIn(["observationSet", "filename"])}</h6>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false} stripedRows={true}>
          {
              this.props.dataspace.getIn(["observationSet", "data"]).keySeq()
                .map(index => (
                  <TableRow
                      key={index}
                      selected={this.props.dataspace.getIn(["observationSet", "selected", index])}>
                    <TableRowColumn>
                      {`Observation ${index+1}`}
                    </TableRowColumn>
                  </TableRow>
                ))
          }
        </TableBody>
      </Table>
    );
  }
}

export default class ObservationSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }
  render(){
    const openBtn = (
      <a href="#" onClick={evt => this.setState({open:true})}>{"Select Observation Data"}</a>
    );
    const closeBtn = (
      <FlatButton label="Close" onTouchTap={evt => this.setState({open:false})}/>
    );
    return (
      <div>
        {openBtn}
        <Dialog modal={true} open={this.state.open} actions={[closeBtn]}
            title={"Select an observation set and data to include"} titleClassName={"center-align"}>
          <div className="row">
            <div className={!this.props.dataspace.has("observationSet") ? "col s12" : "col s5"}>
              <ObservationSetTable
                  dataspace={this.props.dataspace}
                  selectObservationSet={this.props.selectObservationSet}
                  observations={this.props.observations}/>
            </div>
            {
              !this.props.dataspace.has("observationSet") ? null :
              <div className="col s7">
                <ObservationTable
                    dataspace={this.props.dataspace}
                    selectObservations={this.props.selectObservations}/>
              </div>
            }
          </div>
        </Dialog>
      </div>
    );
  }
}
