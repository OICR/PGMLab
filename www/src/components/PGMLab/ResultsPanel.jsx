import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "material-ui/Table";
import ResultsTableRow from "./ResultsTableRow.jsx";
import ResultsTableControls from "./ResultsTableControls.jsx"
var moment = require("moment");

export default class ResultsPanel extends React.Component {
  constructor(props){
    super(props);
    this.getTableRows = this.getTableRows.bind(this);
  }
  componentWillMount(){
    this.props.wamp
      .call("celery.tasks", [], {
        id_token: this.props.auth.get("googleIdToken")
      })
      .then(tasks => {
        console.log("...celery.tasks")
        this.props.setTasksInState(tasks);
      });
    let eventSource = new EventSource("celery");
    eventSource.addEventListener(
      "celery.task.add",
      (evt) => {
        console.log(JSON.parse(evt.data));
        this.props.addTaskInState(JSON.parse(evt.data));
      }
    );
    eventSource.addEventListener(
      "celery.task.update",
      (evt) => {
        console.log(JSON.parse(evt.data));
        this.props.updateTaskInState(JSON.parse(evt.data));
      }
    );
    eventSource.onopen = () => {console.log("...EventSource for SSE connected")};
  }

  getTableRows(){
    return (
      this.props.tasks.valueSeq()
        .filter(t => t.get("task_id").includes(this.props.idFilter))
        .filter(t => this.props.typeFilters.get(t.get("task_type")))
        .filter(t => this.props.statusFilters.get(t.get("status")))
        .sort(
          (t1,t2) => this.props.dateSort === "descending" ?
            (moment(t1.get("submit_datetime")).isAfter(t2.get("submit_datetime")) ? -1:1):
            (moment(t1.get("submit_datetime")).isBefore(t2.get("submit_datetime")) ? -1:1)
        )
        .map(t => <ResultsTableRow key={t.get("task_id")} task={t}></ResultsTableRow>)
    );
  }
  render(){
    const noVertPadding = {paddingBottom: "0px", paddingTop: "0px"};
    const tableTitle = (
      <TableRow>
        <TableHeaderColumn colSpan="6" style={Object.assign({textAlign: "center"},noVertPadding)}>
          <h6>{"Job Queue"}</h6>
          <a className="btn-flat blue-text darken-2" onClick={evt => this.props.toggleFacetedSearch()}>
            {`${this.props.showFaceted ? "Hide":"Show"} faceted search`}
          </a>
        </TableHeaderColumn>
      </TableRow>
    );
    const facetedSearchControls = (
      !this.props.showFaceted ? null :
        <TableRow>
          <TableHeaderColumn colSpan="6" style={{padding: "0px"}}>
            <ResultsTableControls {...this.props} />
          </TableHeaderColumn>
        </TableRow>
    );
    const tableHeaders = (
      <TableRow>
        <TableHeaderColumn tooltip={"Job ID in queue"}>{"ID"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"Job status in queue"}>{"Status"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"PGMLab run type"}>{"Type"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"PGMLab files and parameters"}>{"Info"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"Date and time queued"}>{"Submitted"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"Download zip package"}>{"Results"}</TableHeaderColumn>
      </TableRow>
    );
    return (
      <div className="col s9">
        <div className="card-panel">
          <Table selectable={false} height={"550px"}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              {tableTitle}
              {facetedSearchControls}
              {tableHeaders}
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true} preScanRows={false}>
              {this.getTableRows()}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
