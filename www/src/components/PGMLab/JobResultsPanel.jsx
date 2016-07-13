import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
var moment = require("moment");

import ResultsTableControls from "./ResultsTableControls.jsx";
import ResultsTableBody from "./ResultsTableBody.jsx";

export class JobResultsPanel extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
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
    console.log("...EventSource for SSE: ", eventSource)
  }
  componentDidMount(){
    this.props.session
      .call("celery.tasks")
      .then(tasks => {
        console.log("...celery.tasks: ", tasks)
        this.props.setTasksInState(tasks);
      })
  }
  render(){
    return (
      <div className="col s9">
        <div className="card-panel">
          <div className="section">
            <ResultsTableControls {...this.props} />
          </div>
          <div className="section">
            <ResultsTableBody {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
