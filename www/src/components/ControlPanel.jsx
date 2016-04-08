import React from 'react'

import {ControlPanelLearning} from "./ControlPanelLearning.jsx"
import {ControlPanelInference} from "./ControlPanelInference.jsx"

import {UploadModal} from "./UploadModal.jsx"

export class ControlPanel extends React.Component {

    render() {
        console.log("CP", this.props)
        var runPanel = (this.props.toggle === "Inference")? 
                    <ControlPanelInference setActivePathway       = {this.props.setActivePathway} 
                                           activePathway          = {this.props.activePathway} 
                                           selectedObservationSet = {this.props.selectedObservationSetInference}
                                           selectObservationSet   = {this.props.selectObservationSetInference}
                                           observationSets        = {this.props.observationSets}
                                           selectPathway          = {this.props.selectPathwayInference}
                                           removeSelectedPathway  = {this.props.removeSelectedPathwayInference}
                                           removeObservedNode     = {this.props.removeObservednode}
                                           setNodeState           = {this.props.setNodeState}
                                           observeNode            = {this.props.observeNode}
                                           selectedPathways       = {this.props.selectedPathwaysInference}
                                           selectObservation      = {this.props.selectObservationInference}
                                           selectedObservation    = {this.props.selectedObservationInference}
                                           pairwiseInteractions   = {this.props.pairwiseInteractions}
                                           run                    = {this.props.runInfernce}
                                           runType                = {this.props.toggle}
                                           pathways               = {this.props.pathways} />
                    :
                    <ControlPanelLearning setActivePathway        = {this.props.setActivePathway} 
                                          activePathway           = {this.props.activePathway} 
                                          selectedObservationSet  = {this.props.selectedObservationSetLearning}
                                          selectObservationSet    = {this.props.selectObservationSetLearning}
                                          observationSets         = {this.props.observationSets}
                                          selectPathway           = {this.props.selectPathwayLearning}
                                          removeSelectedPathway   = {this.props.removeSelectedPathwayLearning}
                                          removeObservedNode      = {this.props.removeObservednode}
                                          setNodeState            = {this.props.setNodeState}
                                          observeNode             = {this.props.observeNode}
                                          selectedPathways        = {this.props.selectedPathwaysLearning}
                                          selectObservation       = {this.props.selectObservationLearning}
                                          selectedObservation     = {this.props.selectedObservationLearning}
                                          pairwiseInteractions    = {this.props.pairwiseInteractions}
                                          run                     = {this.props.runLearning}
                                          runType                 = {this.props.toggle}
                                          pathways                = {this.props.pathways} /> 
        return (
                <div className="col s4" style={{minWidth:"300px"}}>
                    <div className="section row">
                        <div className="switch col s8" >
                            <label>
                                Inference
                            <input type="checkbox" />
                            <span className="lever" onClick={this.props.toggleClick} />
                                Learning
                            </label>
                        </div>
                        <div className="col s2 push-s2"> 
                            <UploadModal addNewPathway                  = {this.props.addNewPathway} 
                                         addNewObservationSet           = {this.props.addNewObservationSet}
                                         addNewEstimatedParameterSet    = {this.props.addNewEstimatedParameterSet}
                                         addNewPosteriorProbabilitySet  = {this.props.addNewPosteriorProbabilitySet}
                                         uploadList                     = {this.props.uploadList}
                                         uploadListAddFailure           = {this.props.uploadListAddFailure} />
                            <a className="modal-trigger tooltipped" data-position="top" data-delay="50" data-tooltip="Upload Data" href="#uploadModal1"><i style={{paddingRight: "20px"}} className="material-icons dp48">open_in_browser</i></a>
                        </div>
                    </div>
                    <div className="divider"></div>
                         {runPanel}
                </div>)
    }
}
