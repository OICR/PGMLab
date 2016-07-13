import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
var moment = require("moment");

export class ResultsTableBody extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Table selectable={false} height={"400px"}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan="6" style={{textAlign: "center"}}>
              {"PGMLab Job Queue"}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip={"Job ID in queue"}>{"ID"}</TableHeaderColumn>
            <TableHeaderColumn tooltip={"Job status in queue"}>{"Status"}</TableHeaderColumn>
            <TableHeaderColumn tooltip={"PGMLab run type"}>{"Type"}</TableHeaderColumn>
            <TableHeaderColumn tooltip={"PGMLab files and parameters"}>{"Info"}</TableHeaderColumn>
            <TableHeaderColumn tooltip={"Date and time queued"}>{"Submitted"}</TableHeaderColumn>
            <TableHeaderColumn tooltip={"Download zip package"}>{"Results"}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true} preScanRows={false}>
        </TableBody>
      </Table>
    );
  }
}
