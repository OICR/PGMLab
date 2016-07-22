import React from "react"

export default class LearningSubmit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numberStates: 3, //defaultValues
      maxIterations: 4000
    }
    this.submitLearning = this.submitLearning.bind(this);
  }

  submitLearning(evt){
    evt.preventDefault();
    const data = new FormData(this.refs.learningForm);
    data.append("id_token", this.props.auth.get("googleIdToken"));
    $.ajax({
      type: "POST",
      url: "https://localhost:4433/run/learning/submit",
      processData: false,
      contentType: false,
      data,
      success: (data, textStatus, jqXHR) => {
        console.log("...learning task submitted: ", data)
        this.props.snackbarNotify(`Queued job: ${data}`);
      },
      error: (jqXHR, textStatus, error) => {
        console.log("...learning task error: ", jqXHR, textStatus, error);
        this.props.snackbarNotify("Unable to submit task. Please try again");
      }
    });
  }
  
  render(){
    const noMarginTop = {marginTop: "0px"};
    // Uploading .pi and .obs files
    const uploads = {
      "pairwiseInteraction": "Pairwise interaction File",
      "observation": "Observation File"
    };
    const uploadInputs = (
      Object.keys(uploads)
        .map(k => (
          <div key={k} className="row input-field file-field">
            <h6 className="center-align">{`${uploads[k]}`}</h6>
            <div className="btn">
              <span><i className="material-icons">file_upload</i></span>
              <input type="file" name={`${k}File`} />
            </div>
            <div className="file-path-wrapper">
              <input
                type="text" className="file-path validate"
                name={`${k}Filename`} placeholder="Upload a file" />
            </div>
          </div>
        ))
    );
    // Parameters
    const numberStatesInput = (
      <div className="row input-field">
        <span>{`Number of States: ${this.state.numberStates}`}</span>
        <p className="range-field" style={noMarginTop}>
          <input  type="range" name="numberStates" defaultValue={3} min={2} max={10}
                  onInput={evt=>{this.setState({numberStates: evt.target.value})}} />
        </p>
      </div>
    );
    const maxIterationInput = (
      <div className="row input-field">
        <span>{`EM Max Iterations: ${this.state.maxIterations}`}</span>
        <p className="range-field" style={noMarginTop}>
          <input type="range" name="emMaxIterations" defaultValue={4000} min={0} max={8000}
            onChange={evt=>{this.setState({maxIterations: evt.target.value})}} />
        </p>
      </div>
    );
    const logLikelihoodInput = (
      <div className="row input-field">
        <span>{"Log Likelihood Change Limit:"}</span>
        <input type="number" name="logLikelihoodChangeLimit" step={0.00001} defaultValue={0.001} min={0}
          className="center-align"/>
      </div>
    );
    return (
      <form ref="learningForm" className="center-align" onSubmit={evt=>{this.submitLearning(evt)}}>
          {uploadInputs}
          {numberStatesInput}
          {maxIterationInput}
          {logLikelihoodInput}
          <button className="waves-effect btn-large" type="submit">
            {"Run Learning"}
          </button>
      </form>
    );
  }
}
