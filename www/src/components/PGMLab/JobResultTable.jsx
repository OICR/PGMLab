import React from "react"
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

  tableProperties(){
    const noVertMargin = {marginBottom: "0px", marginTop: "0px"};
    const idFilter = ( //lowercase input only
      <div className="row" style={noVertMargin}>
        <form>
            <input id="idFilter" value={this.state.idFilter} type="text" style={{paddingBottom:"0px"}}
              onChange={evt => this.setIDFilter(evt.target.value.toLowerCase())}/>
        </form>
      </div>
    );
    const typeFilters = (
      <div className="row" style={noVertMargin}>
        <form>
        <div className="col s2">{"Run types:"}</div>
        {
          ["Learning", "Inference"]
            .map(type =>
              <div key={type} className="col s2">
                <input id={`${type}Filter`} value={type.toLowerCase()} type="checkbox"
                  checked={this.state.typeFilters.has(type.toLowerCase())}
                  onChange={evt => this.setTypeFilter(evt.target.value)}/>
                <label htmlFor={`${type}Filter`}>{`${type}`}</label>
              </div>
            )
        }
        </form>
      </div>
    );
    const statusFilters = (
      <div className="row" style={noVertMargin}>
        <form>
        <div className="col s2">{"Statuses:"}</div>
        {
          ["Received", "Started", "Succeeded", "Failed"]
            .map(status =>
              <div key={status} className="col s2">
                <input id={`${status}Filter`} value={status.toLowerCase()} type="checkbox"
                  checked={this.state.statusFilters.has(status.toLowerCase())}
                  onChange={evt => this.setStatusFilter(evt.target.value)}/>
                <label htmlFor={`${status}Filter`}>{`${status}`}</label>
              </div>
            )
        }
        </form>
      </div>
    );
    const dateSort = (
      <div className="row" style={noVertMargin}>
        <form>
          <div className="col s2">{"Sort date:"}</div>
          {
            ["Ascending", "Descending"]
              .map(sort =>
                <div key={sort} className="col s2">
                  <input id={`${sort}Order`} name="dateSort" value={sort.toLowerCase()} type="radio"
                    checked={this.state.dateSort===sort}
                    onChange={evt => this.setDateSort(evt.target.value)}/>
                  <label htmlFor={`${sort}Order`}>{`${sort}`}</label>
                </div>
              )
          }
        </form>
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
      .sort((t1,t2) => this.state.dateSort ?
        (moment(t1.submit_datetime).isBefore(t2.submit_datetime) ? -1 : 1):
        (moment(t1.submit_datetime).isAfter(t2.submit_datetime) ? -1 : 1));
    return (
      <table className="col s12">
        <thead>
          <tr>
            <th data-field="type">{"Run Type"}</th>
            <th data-field="status">{"Status"}</th>
            <th data-field="datetime">{"Submitted"}</th>
            <th data-field="id">{"Job ID"}</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks
              .map((t,i) =>
                <tr key={t.task_id}>
                  <td>{t.task_type}</td>
                  <td>{t.status}</td>
                  <td>{moment(t.submit_datetime).format("MMMM Do YYYY, h:mm a")}</td>
                  <td>{t.task_id}</td>
                </tr>)
          }
        </tbody>
      </table>
    );
  }
  render(){
    return (
      <div className="col s8">
        <div className="row card-panel">
          {this.tableProperties()}
          {this.tasksTable()}
        </div>
      </div>
    );
  }
}
