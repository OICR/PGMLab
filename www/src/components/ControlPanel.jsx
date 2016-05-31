import React from 'react';

import {UploadModal} from "./UploadModal.jsx";
import {DataSelection} from "./DataSelection.jsx";
import {ObservationsControl} from "./ObservationsControl.jsx";
import {PathwaysControl} from "./PathwaysControl.jsx";
import {ResultsControl} from "./ResultsControl.jsx";

var classNames = require("classnames");

export class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.handleRunType = this.handleRunType.bind(this);
  }
  handleRunType(type){
    // Only toggle if clicking a different run type
    if (type !== this.props.toggle) {
      this.props.toggleRunType();
    };
  }
  render(){
    // console.log("CP", this.props)
    const inferenceBtnClass = classNames({
      'light-blue':this.props.toggle==="Inference",
      'grey':this.props.toggle!=="Inference"
    }, ['col s6 btn waves-effect light-blue lighten-1 white-text']);
    const learningBtnClass = classNames({
      'light-blue':this.props.toggle==="Learning",
      'grey':this.props.toggle!=="Learning"
    }, ['col s6 btn waves-effect light-blue lighten-1 white-text']);
    return (
    <div>
      <div className="row">
        <div className="col s9">
          <a className={inferenceBtnClass} onClick={()=>{this.handleRunType("Inference")}}>Inference</a>
          <a className={learningBtnClass} onClick={()=>{this.handleRunType("Learning")}}>Learning</a>
        </div>
        <div className="col s3 center-align">
          <UploadModal addNewPathway                  = {this.props.addNewPathway}
                       addNewObservationSet           = {this.props.addNewObservationSet}
                       addNewEstimatedParameterSet    = {this.props.addNewEstimatedParameterSet}
                       addNewPosteriorProbabilitySet  = {this.props.addNewPosteriorProbabilitySet}
                       uploadList                     = {this.props.uploadList}
                       uploadListAddFailure           = {this.props.uploadListAddFailure} />

        </div>
      </div>
        <div className="divider"></div><div className="divider"></div>
        <DataSelection
                        observationMap = {this.props.observationMap}
                        pathwayMap = {this.props.pathwayMap}
                        selectPathways = {this.props.selectPathways}
                        removeSelectedPathways = {this.props.removeSelectedPathways}
                        selectObservationSet = {this.props.selectObservationSet}
                        selectObservations = {this.props.selectObservations}
                        removeSelectedObservations = {this.props.removeSelectedObservations} />
        <div className="divider"></div><div className="divider"></div>
        <ObservationsControl  observationMap = {this.props.observationMap}
                              pairwiseInteractions={this.props.pairwiseInteractions}
                              setNodeItemState = {this.props.setNodeItemState}
                              setActiveObservation = {this.props.setActiveObservation} />
        <PathwaysControl  observationMap = {this.props.observationMap}
                          pathwayMap = {this.props.pathwayMap}

                          setNodeItemState = {this.props.setNodeItemState}
                          pairwiseInteractions={this.props.pairwiseInteractions}
                          setActivePathway = {this.props.setActivePathway} />

        <div className="divider"></div><div className="divider"></div>
        <ResultsControl runInference={this.props.runInference}
                        toggle={this.props.toggle}/>
    </div>
    )
  }
}
