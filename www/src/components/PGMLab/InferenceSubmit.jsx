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
    evt.preventDefault();
    const data = new FormData(this.refs.inferenceForm);
    data.append("id_token", this.props.auth.get("googleIdToken"));
    $.ajax({
      type: "POST",
      url: "https://localhost:4433/run/inference/submit",
      processData: false,
      contentType: false,
      data,
      success: (data, textStatus, jqXHR) => {
        console.log("...inference task submitted: ", data)
        this.props.snackbarNotify(`Queued job: ${data}`);
      },
      error: (jqXHR, textStatus, error) => {
        console.log("...inference task error: ", jqXHR, textStatus, error);
        this.props.snackbarNotify("Unable to submit task. Please try again");
      }
    });
  }

  render(){
    const noMarginTop = {marginTop: "0px"};
    const uploads = {
      "pairwiseInteraction": "Pairwise interaction File",
      "observation": "Observation File",
      "learntFactorgraph": "Learnt Factorgraph File (Optional)"
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
    const numberStatesInput = (
      <div className="row input-field">
        <span>{"Number of States: "+this.state.numberStates}</span>
        <p className="range-field">
          <input type="range" name="numberStates" defaultValue={3} min={2} max={10}
            onInput={(evt)=>{this.setState({numberStates: evt.target.value})}}/>
        </p>
      </div>
    );
    return (
      <form ref="inferenceForm" className="center-align" onSubmit={evt=>{this.submitInference(evt)}}>
        {uploadInputs}
        {numberStatesInput}
        <button className="waves-effect btn-large" type="submit">
          {"Run Inference"}
        </button>
      </form>
    );
  }
}
