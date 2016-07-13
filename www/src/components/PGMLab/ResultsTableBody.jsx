import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "material-ui/Table";
import ResultsTableRow from "./ResultsTableRow.jsx";
var moment = require("moment");

export default class ResultsTableBody extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const rows = this.props.tasks.valueSeq()
      .filter(t => t.get("task_id").includes(this.props.idFilter))
      .filter(t => this.props.typeFilters.get(t.get("task_type")))
      .filter(t => this.props.statusFilters.get(t.get("status")))
      .sort(
        (t1,t2) => this.props.dateSort === "descending" ?
          (moment(t1.get("submit_datetime")).isAfter(t2.get("submit_datetime")) ? -1:1):
          (moment(t1.get("submit_datetime")).isBefore(t2.get("submit_datetime")) ? -1:1)
      )
      .map(t => <ResultsTableRow key={t.get("task_id")} task={t}/>);
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
        <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true} preScanRows={false}
          children={rows}/>
      </Table>
    );
  }
}
