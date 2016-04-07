import React from 'react'

import {ControlPanelLearning} from "./ControlPanelLearning.jsx"
import {ControlPanelInference} from "./ControlPanelInference.jsx"

import {UploadModal} from "./UploadModal.jsx"

export class ControlPanel extends React.Component {

    render() {
        var runPanel = (this.props.toggle === "Inference")? 
                    <ControlPanelInference setActivePathway                = {this.props.setActivePathway} 
                                           activePathway                   = {this.props.activePathway} 
                                           selectedObservationSetInference = {this.props.selectedObservationSetInference}
                                           observationSets                 = {this.props.observationSets}
                                           selectPathwayInference          = {this.props.selectPathwayInference}
                                           removeSelectedPathwayInference  = {this.props.removeSelectedPathwayInference}
                                           removeObservedNode              = {this.props.removeObservednode}
                                           setNodeState                    = {this.props.setNodeState}
                                           observeNode                     = {this.props.observeNode}
                                           selectedPathwaysInference       = {this.props.selectedPathwaysInference}
                                           pairwiseInteractions            = {this.props.pairwiseInteractions}
                                           pathways                        = {this.props.pathways} />
                    :
                    <ControlPanelLearning setActivePathway                = {this.props.setActivePathway} 
                                          activePathway                   = {this.props.activePathway} 
                                          selectedObservationSetLearning  = {this.props.selectedObservationSetLearning}
                                          observationSets                 = {this.props.observationSets}
                                          selectPathwayLearning           = {this.props.selectPathwayLearning}
                                          removeSelectedPathwayLearning   = {this.props.removeSelectedPathwayLearning}
                                          removeObservedNode              = {this.props.removeObservednode}
                                          setNodeState                    = {this.props.setNodeState}
                                          observeNode                     = {this.props.observeNode}
                                          selectedPathwaysLearning        = {this.props.selectedPathwaysLearning}
                                          pairwiseInteractions            = {this.props.pairwiseInteractions}
                                          pathways                        = {this.props.pathways} /> 
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
