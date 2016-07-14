import React from "react";
import {TableRow, TableRowColumn} from "material-ui/Table";
var moment = require("moment");

export default class ResultsTableRow extends React.Component {
  constructor(props){
    super(props);
  }

  getStatusIcon(status){
    switch (status) {
      case "task-received":
        return (<i className="material-icons">low_priority</i>);
      case "task-started":
        return (
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        );
      case "task-succeeded":
        return (<i className="material-icons">check_circle</i>);
      case "task-failed":
        return (<i className="material-icons">error</i>);
    }
  };
  getInfo(task){
    return (
      <span>
        <div>{`${task.get("pi_filename") || "-"}`}</div>
        <div>{`${task.get("obs_filename") || "-"}`}</div>
        {
          task.get("task_type")==="inference" ? <div>{`${task.get("lfg_filename") || ``}`}</div>:undefined
        }
        <div>
          {`(
            ${task.get("number_states")}
            ${task.get("task_type")==="learning" ? `, ${task.get("max_iterations")}, ${task.get("change_limit")}`:``}
          )`}
        </div>
      </span>
    );
  }
  getDatetime(datetime){
    const datetimeMoment = moment(datetime);
    return (
      <span>
        {`${datetimeMoment.format("MMMM Do YYYY")}`}
        <br/>
        {`${datetimeMoment.format("h:mm a")}`}
      </span>
    );
  }
  getResult(task){
    switch (task.get("status")) {
      case "task-succeeded":
        return (
          <a download href={`./results/${task.get("task_id")}`}>{"Download"}</a>
        );
      case "task-failed":
        return (
          <span>{"Invalid Task Error"}</span>
        );
      default:
        return undefined
    }
  }
  render(){
    const task = this.props.task;
    // Need to pass table properties to this custom MaterialUI TableRow component
    return (
      <TableRow {...this.props}>
        <TableRowColumn>{`${task.get("task_id")}`}</TableRowColumn>
        <TableRowColumn>{this.getStatusIcon(task.get("status"))}</TableRowColumn>
        <TableRowColumn>{`${task.get("task_type")}`}</TableRowColumn>
        <TableRowColumn>{this.getInfo(task)}</TableRowColumn>
        <TableRowColumn>{this.getDatetime(task.get("submit_datetime"))}</TableRowColumn>
        <TableRowColumn>{this.getResult(task)}</TableRowColumn>
      </TableRow>
    );
  }
}
