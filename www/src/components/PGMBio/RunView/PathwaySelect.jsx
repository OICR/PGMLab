import React from "react";
import {Dialog, FlatButton} from "material-ui";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class PathwayTable extends React.Component {
  constructor(props){
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
  }
  onRowSelection(){

  }
  render(){
    return (
      <Table multiSelectable={true} height={"330px"}
          onRowSelection={selected => this.onRowSelection(selected)}>
        <TableHeader displaySelectAll={true}>
          <TableRow>
            <TableHeaderColumn>
              <h5 className="black-text">Pathways</h5>
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>
              Filter goes here
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
      open: false
    };
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
              <PathwayTable />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
