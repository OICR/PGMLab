import React from "react"

export class JobResultTable extends React.Component {
  constructor(props){
    super(props);
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
