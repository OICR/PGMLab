import React from "react"

export class JobResultTable extends React.Component {
  constructor(props){
    super(props);
    props.session
      .subscribe("celery.tasks", (args, kwargs, details)=>{
        console.log("Event received", args, kwargs, details)
      });
  }
  componentDidMount(){
    this.props.session
      .call("all.tasks")
      .then(res => {
        console.log("all.tasks: ", res)
      })
  }
  render(){
    return (
      <div>TABLE
      </div>
    );
  }
}
