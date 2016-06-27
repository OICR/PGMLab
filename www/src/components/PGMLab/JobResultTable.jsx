import React from "react"

export class JobResultTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: {}
    }
    this.updateTask = this.updateTask.bind(this);
    this.tasksTableBody = this.tasksTableBody.bind(this);
  }
  updateTask(task){
    let tasks = this.state.tasks;
    tasks[task["task_id"]] = task;
    this.setState({
      tasks
    });
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
        console.log("all.tasks: ", tasks)
        this.setState({
          tasks
        })
      })
  }

  tasksTableHeader(){
    return (
      <thead>
        <tr>
          <th data-field="id">{"Task ID"}</th>
          <th data-field="type">{"Task Type"}</th>
          <th data-field="datetime">{"Submitted"}</th>
          <th data-field="status">{"Status"}</th>
        </tr>
      </thead>
    );
  }
  tasksTableBody(){
    const tasks = Object.keys(this.state.tasks).map(k => this.state.tasks[k]);
    return (
      <tbody>
        {
          tasks.map(t =>
            <tr key={t.task_id}>
              <td>{t.task_id}</td>
              <td>{t.task_type}</td>
              <td>{t.submit_datetime}</td>
              <td>{t.status}</td>
            </tr>)
        }
      </tbody>
    );
  }
  render(){
    return (
      <table className="col s8 highlight">
        {this.tasksTableHeader()}
        {this.tasksTableBody()}
      </table>
    );
  }
}
