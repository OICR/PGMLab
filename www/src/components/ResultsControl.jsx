import React from "react";

import {RaisedButton} from "material-ui";

export class ResultsControl extends React.Component {
  constructor(props){
    super(props);

    this.handleRun = this.handleRun.bind(this);
    this.handleResults = this.handleResults.bind(this);
  }

  handleRun(){
    switch (this.props.runType) {
      case "Inference":
        this.props.runInference(); break;
      case "Learning":
        console.log("runLearning"); break;
    };
  }
  handleResults(){
    console.log("Present results somehow");
  }

  // RENDERING
  render(){
    return (
      <div className="section">
        <div className="row">
          <div className="col s6 center-align">
            <a className="waves-effect waves-light btn" onClick={this.handleRun}>Run</a>
          </div>
          <div className="col s6 center-align">
            <a className="waves-effect waves-light btn" onClick={this.handleResults}>Results</a>
          </div>
        </div>
      </div>
    );
  }
}
