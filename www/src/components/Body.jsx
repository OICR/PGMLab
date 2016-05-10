import React from 'react'

import {ControlPanel} from './ControlPanel.jsx';
import {DisplayPanel} from './DisplayPanel.jsx';
var graphvis = require('../bin/graphvis.js');
var classNames = require("classnames");

export class Body extends React.Component {
    constructor(props) {
      super(props)
      this.state = {"toggle": "Inference"}
      this.toggleRunType = this.toggleRunType.bind(this);
    }
    componentDidMount() {
      this.props.setActivePathway(this.props.activePathway, this);
    }
    toggleRunType() {
      this.setState({ "toggle": (this.state.toggle === "Inference")? "Learning": "Inference"})
    }
    render () {
      console.log("body", this.props)
      return (
        <main className="row">
          <div className="col s4" style={{minWidth:"300px"}}>
            <ControlPanel pairwiseInteractions            = {this.props.pairwiseInteractions}
                          uploadList                      = {this.props.uploadList}
                          uploadListAddFailure            = {this.props.uploadListAddFailure}
                          toggleRunType                   = {this.toggleRunType}
                          toggle                          = {this.state.toggle}
                          observeNode                     = {this.props.observeNode}
                          removeObservedNode              = {this.props.removeObservedNode}
                          selectedObservationSetLearning  = {this.props.selectedObservationSetLearning}
                          selectedObservationSetInference = {this.props.selectedObservationSetInference}
                          selectObservationSetLearning    = {this.props.selectObservationSetLearning}
                          selectObservationSetInference   = {this.props.selectObservationSetInference}
                          selectedObservationInference    = {this.props.selectedObservationInference}
                          selectedObservationLearning     = {this.props.selectedObservationLearning}
                          observationSets                 = {this.props.observationSets}
                          runInference                    = {this.props.runInference}
                          setNodeState                    = {this.props.setNodeState}
                          removeSelectedPathwayInference  = {this.props.removeSelectedPathwayInference}
                          selectPathwayInference          = {this.props.selectPathwayInference}
                          selectedPathwaysInference       = {this.props.selectedPathwaysInference}
                          removeSelectedPathwayLearning   = {this.props.removeSelectedPathwayLearning}
                          selectPathwayLearning           = {this.props.selectPathwayLearning}
                          selectedPathwaysLearning        = {this.props.selectedPathwaysLearning}
                          selectObservationInference      = {this.props.selectObservationInference}
                          selectObservationLearning       = {this.props.selectObservationLearning}
                          pathways                        = {this.props.pathways}
                          activePathway                   = {this.props.activePathway}
                          setActivePathway                = {this.props.setActivePathway}
                          addNewPathway                   = {this.props.addNewPathway}
                          addNewObservationSet            = {this.props.addNewObservationSet}
                          addNewEstimatedParameterSet     = {this.props.addNewEstimatedParameterSet}
                          addNewPosteriorProbabilitySet   = {this.props.addNewPosteriorProbabilitySet} />
          </div>
          <div className="col s8" style={{minWidth:"800px"}}>
            <DisplayPanel
              toggle = {this.state.toggle}
              observationSets = {this.props.observationSets}
              selectedObservationSetInference = {this.props.selectedObservationSetInference}
              selectedObservationSetLearning = {this.props.selectedObservationSetLearning}
              activePathway = {this.props.activePathway} />
          </div>
        </main>
      )
    }
}
