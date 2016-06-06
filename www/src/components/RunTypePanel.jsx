import React from "react";

export class RunTypePanel extends React.Component {
  constructor(props){
    super(props);

    this.handleRunType = this.handleRunType.bind(this);
  }
  handleRunType(type){
    if (type !== this.props.runType) {
      this.props.toggleRunType();
    };
  }
  render(){
    const btnClass = "col s6 btn waves-effect lighten-1 white-text";
    const inferenceBtnClass = `${btnClass} ${this.props.runType==="Inference" ? "light-blue" : "grey"}`;
    const learningBtnClass = `${btnClass} ${this.props.runType==="Learning" ? "light-blue" : "grey"}`;
    const tabPrompt = this.props.tab==="Run" ?
      "Run PGMLab learning and inference jobs" :
      "View PGMLab job results and uploaded data";
    return (
      <div>
      <div className="row">
        <div className="col s12 center-align">
          <div className="chip grey lighten-1">{tabPrompt}</div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 center-align">
          <a className={learningBtnClass} onClick={()=>{this.handleRunType("Learning")}}>Learning</a>
          <a className={inferenceBtnClass} onClick={()=>{this.handleRunType("Inference")}}>Inference</a>
        </div>
      </div>
      </div>
    );
  }
}
