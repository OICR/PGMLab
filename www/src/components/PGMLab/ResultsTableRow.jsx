import React from "react";
import {TableRow, TableRowColumn} from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
var moment = require("moment");

export default class ResultsTableRow extends React.Component {
  constructor(props){
    super(props);
    this.getID = this.getID.bind(this);
    this.getStatusIcon = this.getStatusIcon.bind(this);
    this.getResult = this.getResult.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getDatetime = this.getDatetime.bind(this);
  }
  componentDidMount(){
    $(".tooltipped").tooltip({delay:25});
  }

  getID(){
    const id = this.props.task.get("task_id");
    return (
      <span className="tooltipped" data-position="bottom" data-tooltip={`${id}`}>
        {`${id}`}
      </span>
    );
  }
  getStatusIcon(){
    const status = this.props.task.get("status");
    switch (status) {
      case "task-received":
        return (<i className="material-icons">low_priority</i>);
      case "task-started":
        return (<CircularProgress size={0.4} color="black"/>);
      case "task-succeeded":
        return (<i className="material-icons">check_circle</i>);
      case "task-failed":
        return (<i className="material-icons">error</i>);
    }
  };
  getResult(){
    const resultsURI = "http://127.0.0.1:8000/results";
    const status = this.props.task.get("status");
    const id = this.props.task.get("task_id");
    return (
      status == "task-succeeded" ? <a download href={`${resultsURI}/${id}`}>{"Download"}</a>
      : status == "task-failed" ? <span>{"Invalid Task Error"}</span>
      : undefined
    );
  }
  getInfo(){
    const task = this.props.task;
    return (
      <span>
        <div>{`${task.get("pi_filename") || "-"}`}</div>
        <div>{`${task.get("obs_filename") || "-"}`}</div>
        {task.get("task_type")==="inference" ? <div>{`${task.get("lfg_filename") || ``}`}</div>:undefined}
        <div>
          {`(
            ${task.get("number_states")}
            ${task.get("task_type")==="learning" ? `, ${task.get("max_iterations")}, ${task.get("change_limit")}`:``}
          )`}
        </div>
      </span>
    );
  }
  getDatetime(){
    const datetime = moment(this.props.task.get("submit_datetime"));
    return (
      <span>
        {`${datetime.format("DD/MM/YYYY")}`}
        <br/>
        {`${datetime.format("h:mm a")}`}
      </span>
    );
  }
  render(){
    // Need to pass table properties to this custom MaterialUI TableRow component
    const id = this.getID();
    const status = this.getStatusIcon();
    const result = this.getResult();
    const type = `${this.props.task.get("task_type")}`;
    const info = this.getInfo();
    const datetime = this.getDatetime();
    return (
      <TableRow {...this.props}>
        <TableRowColumn>{id}</TableRowColumn>
        <TableRowColumn style={{"textAlign": "center"}}>{status}</TableRowColumn>
        <TableRowColumn>{result}</TableRowColumn>
        <TableRowColumn>{type}</TableRowColumn>
        <TableRowColumn>{info}</TableRowColumn>
        <TableRowColumn>{datetime}</TableRowColumn>
      </TableRow>
    );
  }
}
