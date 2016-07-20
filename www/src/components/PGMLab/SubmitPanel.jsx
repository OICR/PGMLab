import React from "react";
import InferenceSubmit from "./InferenceSubmit.jsx";
import LearningSubmit from "./LearningSubmit.jsx";
import Snackbar from "material-ui/Snackbar";

class SnackbarNotification extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState){
    // Only update (i.e. show notification again) if message is different
    return nextProps.snackbarMessage !== this.props.snackbarMessage;
  }
  render(){
    return (
      <Snackbar open={true} message={this.props.snackbarMessage} autoHideDuration={2500}/>
    );
  }
}

export default class SubmitPanel extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    $("ul.tabs").tabs();
    $("ul.tabs .indicator").addClass("teal");
  }
  render(){
    const {auth, snackbarNotify, snackbarMessage} = this.props;
    return (
      <div className="col s3">
        <div className="row card-panel">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6">
                <a href="#Learning"><span className="teal-text">{"Learning"}</span></a>
              </li>
              <li className="tab col s6">
                <a href="#Inference"><span className="teal-text">{"Inference"}</span></a>
              </li>
            </ul>
          </div>
          <div id="Learning" className="col s12">
            <LearningSubmit auth={auth} snackbarNotify={snackbarNotify}/>
          </div>
          <div id="Inference" className="col s12">
            <InferenceSubmit auth={auth} snackbarNotify={snackbarNotify}/>
          </div>
        </div>
        <SnackbarNotification snackbarMessage={this.props.snackbarMessage} />
      </div>
    );
  }
}
