import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ObservationSetTable extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Table multiSelectable={false} height={"400px"}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              Observation Set Name
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {
            this.props.observations.valueSeq()
              .map(o => (
                <TableRow key={o.get("_id")}>
                  <TableRowColumn>
                    {o.get("filename")}
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
  }
  render(){
    return (
      <Table multiSelectable={true} height={"400px"}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>
              Observation Set Name
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
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
              <ObservationSetTable observations={this.props.observations}/>
            </div>
            <div className="col s7">
              <ObservationTable />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
