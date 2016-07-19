import React from "react"

export default class InferenceSubmit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numberStates: 3 //defaultValue
    }
    this.submitInference = this.submitInference.bind(this);
  }

  submitInference(evt){
    evt.preventDefault()
    $.ajax({
      type: "POST",
      url: "https://localhost:4433/run/inference/submit",
      processData: false,
      contentType: false,
      data: new FormData(this.refs.inferenceForm),
      success: (data, textStatus, jqXHR) => {
        console.log("...inference task submitted: ", data)
        this.props.snackbarNotify(`Queued job: ${data}`);
      },
      error: (jqXHR, textStatus, error) => {
        console.log("...inference task error: ", jqXHR, textStatus, error);
        this.props.snackbarNotify("Unable to submit task. Please try again");
      }
    })
  }
  render(){
    return (
      <form ref="inferenceForm" className="center-align" onSubmit={evt=>{this.submitInference(evt)}}>
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

          <div className="row input-field file-field">
            <p>{"Learnt Factorgraph File (Optional)"}</p>
            <div className="btn">
              <span><i className="material-icons">file_upload</i></span>
              <input type="file" name="learntFactorgraphFile" />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path validate" name="learntFactorgraphFilename" />
            </div>
          </div>

          <div className="row input-field">
            <p>{"Number of States: "+this.state.numberStates}</p>
            <p className="range-field">
              <input  type="range" name="inferenceNumberOfStates" defaultValue={3} min={2} max={10}
                      onInput={(evt)=>{this.setState({numberStates: evt.target.value})}}/>
            </p>
          </div>
          <button className="btn" type="submit">Run Inference</button>
      </form>
    );
  }
}
