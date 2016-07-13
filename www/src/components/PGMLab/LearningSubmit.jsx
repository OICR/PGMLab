import React from "react"

export class LearningSubmit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //defaultValues
      numberStates: 3,
      maxIterations: 4000
    }
    this.submitLearning = this.submitLearning.bind(this);
  }
  submitLearning(evt){
    evt.preventDefault()
    $.ajax({
      type: "POST",
      url: "https://localhost:4433/run/learning/submit",
      processData: false,
      contentType: false,
      data: new FormData(this.refs.learningForm),
      success: (data, textStatus, jqXHR) => {
        console.log("...learning task submitted: ", data)
        return;
      },
      error: (jqXHR, textStatus, error) => {
        console.log("...learning task error: ", jqXHR, textStatus, error);
        return;
      }
    });
  }
  render(){
    return (
      <form ref="learningForm" className="center-align" onSubmit={evt=>{this.submitLearning(evt)}}>
          <div className="row input-field file-field">
            <p>{"Pairwise interaction File"}</p>
            <div className="btn">
              <span><i className="material-icons">file_upload</i></span>
              <input type="file" name="pairwiseInteractionFile" />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path validate" name="pairwiseInteractionFilename" />
            </div>
          </div>

          <div className="row input-field file-field">
            <p>{"Observation File"}</p>
            <div className="btn">
              <span><i className="material-icons">file_upload</i></span>
              <input type="file" name="observationFile" />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path validate" name="observationFilename" />
            </div>
          </div>

          <div className="row input-field">
            <p>{"Number of States: "+this.state.numberStates}</p>
            <p className="range-field">
              <input  type="range" name="numberStates" defaultValue={3} min={2} max={10}
                      onInput={evt=>{this.setState({numberStates: evt.target.value})}} />
            </p>
          </div>

          <div className="row input-field">
            <p>{"EM Max Iterations: "+this.state.maxIterations}</p>
            <p className="range-field">
              <input  type="range" name="emMaxIterations" defaultValue={4000} min={0} max={8000}
                      onChange={evt=>{this.setState({maxIterations: evt.target.value})}} />
            </p>
          </div>

          <div className="row input-field">
            <p>{"Log Likelihood Change Limit"}</p>
            <input type="number" name="logLikelihoodChangeLimit" step={0.00001} defaultValue={0.001} min={0} />
          </div>

          <button className="btn" type="submit">Run Learning</button>
      </form>
    );
  }
}
