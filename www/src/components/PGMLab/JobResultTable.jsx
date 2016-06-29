import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
var moment = require("moment");

export class JobResultTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: {},
      typeFilters: new Set(["learning", "inference"]),
      statusFilters: new Set(["received", "started", "succeeded", "failed"]),
      dateSort: "descending", // || "ascending"
      idFilter: ""
    }
    // this.updateTask = this.updateTask.bind(this);
    this.updateTask = task => {
      let tasks = this.state.tasks;
      tasks[task["task_id"]] = task;
      this.setState({
        tasks
      });
    }
    // For filtering/sorting through results
    this.setTypeFilter = type => {
      const typeFilters = this.state.typeFilters;
      if (typeFilters.has(type)) {typeFilters.delete(type)}
      else {typeFilters.add(type)}; //if selected, jobs should be seen
      this.setState({typeFilters});
    }
    this.setStatusFilter = status => {
      const statusFilters = this.state.statusFilters;
      if (statusFilters.has(status)) {statusFilters.delete(status)}
      else {statusFilters.add(status)};
      this.setState({statusFilters})
    }
    this.setDateSort = dateSort => {
      console.log(dateSort)
      this.setState({dateSort});
    }
    this.setIDFilter = idFilter => {
      this.setState({idFilter})
    }
    this.tableProperties = this.tableProperties.bind(this);
    this.tasksTable = this.tasksTable.bind(this);
  }
  componentWillMount(){
    this.props.session
      .subscribe("celery.task.update", (args, kwargs, details)=>{
        console.log("celery.task.update ", kwargs["task"])
        this.updateTask(kwargs["task"]);
      });
  }
  componentDidMount(){
    this.props.session
      .call("celery.tasks")
      .then(tasks => {
        console.log("celery.tasks: ", tasks)
        this.setState({
          tasks
        })
      })
  }
  componentDidUpdate(){
    $("span.tooltipped").tooltip({delay: 5});
  }

  tableProperties(){
    const noVertMargin = {marginBottom: "0px", marginTop: "0px"};
    const tasksProps = Object.keys(this.state.tasks)
      .map(k => this.state.tasks[k])
      .filter(t => t.task_id.includes(this.state.idFilter))
      .reduce((acc, t) => {
        acc["type"][t.task_type]++;
        acc["status"][t.status]++;
        return acc;
      }, {
        "type": {"learning":0,"inference":0},
        "status": {"received":0,"started":0,"succeeded":0,"failed":0}
      });
    const idFilter = ( //lowercase input only
      <div className="row" style={noVertMargin}>
        <form>
            <input id="idFilter" value={this.state.idFilter} type="text" placeholder="Filter by ID" style={{paddingBottom:"0px"}}
              onChange={evt => this.setIDFilter(evt.target.value.toLowerCase())}/>
        </form>
      </div>
    );
    const typeFilters = (
      <div className="row" style={noVertMargin}>
        <div className="col s1 valign">{"Type:"}</div>
        <div className="col s11 valign">
          <form className="row">
            {
              ["Learning", "Inference"]
                .map(type => {
                  const typeCount = tasksProps["type"][type.toLowerCase()];
                  return (
                    <div key={type} className="col s3 valign">
                      <input id={`${type}Filter`} value={type.toLowerCase()} type="checkbox"
                        checked={this.state.typeFilters.has(type.toLowerCase())}
                        onChange={evt => this.setTypeFilter(evt.target.value)}/>
                      <label htmlFor={`${type}Filter`}>{`${type} (${typeCount})`}</label>
                    </div>
                  );
                })
            }
          </form>
        </div>
      </div>
    );
    const statusFilters = (
      <div className="row" style={noVertMargin}>
        <div className="col s1">{"Status:"}</div>
        <div className="col s11">
          <form className="row">
            {
              ["Received", "Started", "Succeeded", "Failed"]
                .map(status => {
                  const statusCount = tasksProps["status"][status.toLowerCase()];
                  return (
                    <div key={status} className="col s3">
                      <input id={`${status}Filter`} value={status.toLowerCase()} type="checkbox"
                        checked={this.state.statusFilters.has(status.toLowerCase())}
                        onChange={evt => this.setStatusFilter(evt.target.value)}/>
                      <label htmlFor={`${status}Filter`}>{`${status} (${statusCount})`}</label>
                    </div>
                  );
                })
            }
          </form>
        </div>
      </div>
    );
    const dateSort = (
      <div className="row" style={noVertMargin}>
          <div className="col s1">{"Date:"}</div>
          <div className="col s11">
            <form className="row">
              {
                ["Descending", "Ascending"]
                  .map(sort => {
                    return (
                      <div key={sort} className="col s3">
                        <input id={`${sort}Order`} name="dateSort" value={sort.toLowerCase()} type="radio"
                          checked={this.state.dateSort===sort.toLowerCase()}
                          onChange={evt => this.setDateSort(evt.target.value)}/>
                        <label htmlFor={`${sort}Order`}>{`${sort}`}</label>
                      </div>
                    );
                  })
              }
            </form>
          </div>
      </div>
    );
    return (
      <div className="card-panel" style={noVertMargin}>
        {idFilter}
        {typeFilters}
        {statusFilters}
        {dateSort}
      </div>
    );
  }
  tasksTable(){
    const tasks = Object.keys(this.state.tasks)
      .map(k => this.state.tasks[k])
      .filter(t => t.task_id.includes(this.state.idFilter))
      .filter(t => this.state.typeFilters.has(t.task_type))
      .filter(t => this.state.statusFilters.has(t.status))
      .sort((t1,t2) => (this.state.dateSort === "descending") ?
        (moment(t1.submit_datetime).isAfter(t2.submit_datetime) ? -1 : 1):
        (moment(t1.submit_datetime).isBefore(t2.submit_datetime) ? -1 : 1));
    const statusIconMap = {
      "received": <i className="material-icons">low_priority</i>,
      "started":
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
      </div>,
      "succeeded": <i className="material-icons">check_circle</i>,
      "failed": <i className="material-icons">error</i>
    };
    return (
      <Table selectable={false} height={"400px"}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>{"ID"}</TableHeaderColumn>
            <TableHeaderColumn>{"Status"}</TableHeaderColumn>
            <TableHeaderColumn>{"Type"}</TableHeaderColumn>
            <TableHeaderColumn>{"Info"}</TableHeaderColumn>
            <TableHeaderColumn>{"Submitted"}</TableHeaderColumn>
            <TableHeaderColumn>{"Results"}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true} preScanRows={false}>
          {
            tasks.map((t,i) =>
              <TableRow key={i}>
                <TableRowColumn>{`${t.task_id}`}</TableRowColumn>
                <TableRowColumn>{statusIconMap[t.status]}</TableRowColumn>
                <TableRowColumn>{t.task_type}</TableRowColumn>
                <TableRowColumn>{"Info"}</TableRowColumn>
                <TableRowColumn>
                  {`${moment(t.submit_datetime).format("MMMM Do YYYY")}`}
                  <br/>
                  {`${moment(t.submit_datetime).format("h:mm a")}`}
                </TableRowColumn>
                <TableRowColumn>{"Results"}</TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
  render(){
    return (
      <div className="col s9">
        <div className="card-panel">
          <div className="section">
            {this.tableProperties()}
          </div>
          <div className="section">
            {this.tasksTable()}
          </div>
        </div>
      </div>
    );
  }
}
