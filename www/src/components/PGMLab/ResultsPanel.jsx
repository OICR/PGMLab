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
    // let eventSource = new EventSource("celery");
    // let eventSource = new EventSource("http://localhost:8888/celery");
    let eventSource = new EventSource("http://localhost:8000/celery");
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
      !this.props.auth.get("signedIn") ? null :
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
    const notSignedIn = !this.props.auth.get("signedIn");
    const tableTitle = (
      <TableRow>
        <TableHeaderColumn colSpan="6" style={Object.assign({textAlign: "center"},noVertPadding)}>
          <h5 className="grey-text text-darken-4">
            {
              `${notSignedIn ? "":`${this.props.auth.getIn(["googleProfile", "name"])}'s `} Job Queue`
            }
          </h5>
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
        <TableHeaderColumn tooltip={"Job status in queue"} style={{"textAlign":"center"}}>
          {"Status"}
        </TableHeaderColumn>
        <TableHeaderColumn tooltip={"Download zip package"}>{"Results"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"PGMLab run type"}>{"Type"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"PGMLab files and parameters"}>{"Info"}</TableHeaderColumn>
        <TableHeaderColumn tooltip={"Date and time queued"}>{"Submitted"}</TableHeaderColumn>
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
