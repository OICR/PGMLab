import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ObservationSetTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
  }
  onRowSelection(selected){
    const observationSet = this.props.observations.toList().get(selected[0]);
    this.props.selectObservationSet(observationSet);
  }
  render(){
    return (
      <Table multiSelectable={false} height={"300px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              {"Observation Sets"}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
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
    console.log(selected)
    this.props.selectObservations(selected);
  }
  render(){
    return (!this.props.dataspace.has("observationSet") ? null :
      <Table multiSelectable={true} height={"300px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              {this.props.dataspace.getIn(["observationSet", "filename"])}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {
              this.props.dataspace.getIn(["observationSet", "data"]).entrySeq()
                .map(entry => (
                  <TableRow
                      key={entry[0]}
                      selected={this.props.dataspace.getIn(["observationSet", "selected", entry[0]])}>
                    <TableRowColumn>
                      {`Observation ${entry[0]+1}`}
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
        <Dialog modal={true} open={this.state.open} actions={[closeBtn]} title={"Select an observation set and data to include"}>
          <div className="row">
            <div className="col s5">
              <ObservationSetTable
                  dataspace={this.props.dataspace}
                  selectObservationSet={this.props.selectObservationSet}
                  observations={this.props.observations}/>
            </div>
            <div className="col s7">
              <ObservationTable
                  dataspace={this.props.dataspace}
                  selectObservations={this.props.selectObservations}/>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
