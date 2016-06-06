import React from 'react';

import {UploadModal} from "./UploadModal.jsx";
import {DataSelection} from "./DataSelection.jsx";
import {ObservationsControl} from "./ObservationsControl.jsx";
import {PathwaysControl} from "./PathwaysControl.jsx";

export class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.handleRunType = this.handleRunType.bind(this);
    this.handleRun = this.handleRun.bind(this);
  }
  handleRunType(type){
    if (type !== this.props.runType) {
      this.props.toggleRunType();
    };
  }
  handleRun(){
    switch (this.props.runType) {
      case "Inference":
        this.props.runInference(); break;
      case "Learning":
        console.log("runLearning"); break;
    };
  }
  render(){
    // console.log("<ControlPanel> render()");
    const btnClass = "col s6 btn waves-effect lighten-1 white-text";
    const inferenceBtnClass = `${btnClass} ${this.props.runType==="Inference" ? "light-blue" : "grey"}`;
    const learningBtnClass = `${btnClass} ${this.props.runType==="Learning" ? "light-blue" : "grey"}`;
    return (
    <div>
      <div className="row">
        <div className="col s9">
          <a className={inferenceBtnClass} onClick={()=>{this.handleRunType("Inference")}}>Inference</a>
          <a className={learningBtnClass} onClick={()=>{this.handleRunType("Learning")}}>Learning</a>
        </div>
        <div className="col s3 center-align">
          <UploadModal  uploadList                     = {this.props.uploadList}
                        uploadListAddFailure           = {this.props.uploadListAddFailure}
                        addNewPathway                  = {this.props.addNewPathway}
                        addNewObservationSet           = {this.props.addNewObservationSet}
                        addNewEstimatedParameterSet    = {this.props.addNewEstimatedParameterSet}
                        addNewPosteriorProbabilitySet  = {this.props.addNewPosteriorProbabilitySet} />
        </div>
      </div>
      <div className="divider" /><div className="divider" />
      <DataSelection  observationMap = {this.props.observationMap}
                      selectObservationSet = {this.props.selectObservationSet}
                      selectObservations = {this.props.selectObservations}
                      removeSelectedObservations = {this.props.removeSelectedObservations}
                      pathwayMap = {this.props.pathwayMap}
                      selectPathways = {this.props.selectPathways}
                      removeSelectedPathways = {this.props.removeSelectedPathways} />
      <ObservationsControl  pairwiseInteractions={this.props.pairwiseInteractions}
                            observationMap = {this.props.observationMap}
                            setActiveObservation = {this.props.setActiveObservation}
                            setNodeItemState = {this.props.setNodeItemState} />
      <PathwaysControl  pairwiseInteractions={this.props.pairwiseInteractions}
                        observationMap = {this.props.observationMap}
                        pathwayMap = {this.props.pathwayMap}
                        setActivePathway = {this.props.setActivePathway}
                        setNodeItemState = {this.props.setNodeItemState} />

      <div className="divider" /><div className="divider" />
      <div className="row">
        <div className="col s12 center-align">
          <a className="waves-effect waves-light btn" onClick={this.handleRun}>Run</a>
        </div>
      </div>
    </div>
    )
  }
}
