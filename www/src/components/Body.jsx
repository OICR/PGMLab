import React from 'react'

import {ControlPanel} from './ControlPanel.jsx'
var graphvis = require('../bin/graphvis.js');

export class Body extends React.Component {

    constructor(props) { 
        super(props)  
 
        this.state = {"toggle": "Inference"}

        this.toggleClick = this.toggleClick.bind(this)
    } 
 
    componentDidMount() {
        this.props.setActivePathway(this.props.activePathway, this);
    }

    componentDidUpdate() {
        $('.tooltipped').tooltip({delay: 50})
    }
    toggleClick() {
        this.setState({ "toggle": (this.state.toggle === "Inference")? "Learning": "Inference"}) 
    } 

    render () {
console.log("body", this.props)
        return (
            <main className="row">
                     
                <ControlPanel pairwiseInteractions            = {this.props.pairwiseInteractions}
                              uploadList                      = {this.props.uploadList}
                              uploadListAddFailure            = {this.props.uploadListAddFailure}
                              toggleClick                     = {this.toggleClick}
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

                <div className="col s8">
                    <nav style={{"width":"800px"}} className="light-blue lighten-1">
                        <div className="nav-wrapper">
                          <div>
                            <a href="#!" style={{paddingLeft: "10px"}} className="breadcrumb tooltipped"
                                              data-position="top" data-delay="50" data-tooltip="Run Type">{this.state.toggle}</a>
                            <a href="#!" 
                               style={{paddingLeft: "10px"}}
                               className="breadcrumb tooltipped"
                                data-position="top" data-delay="50" data-tooltip="Observation Set"> {(this.toggle === "Inference")?
                                                                                 this.props.observationSets[this.props.selectedObservationSetLearning].name :
                                                                                 this.props.observationSets[this.props.selectedObservationSetInference].name}
                            </a>
                            <a href="#!" 
                               style={{paddingLeft: "10px"}} 
                               className="breadcrumb  tooltipped"
                                data-position="top" data-delay="50" data-tooltip="Observation ID">{(this.state.toggle ==="inference")? 
                                                                                 this.props.observationSets[this.props.selectedObservationSetLearning].id :
                                                                                 this.props.observationSets[this.props.selectedObservationSetInference].id}
                            </a>
                           <a href="#!" style={{paddingLeft: "10px"}} className="breadcrumb tooltipped"
                                data-position="top" data-delay="50" data-tooltip={"Active Pathway Name:"+this.props.activePathway.name}>{this.props.activePathway.name}</a>
                          </div>
                        </div>
                     </nav>
                     <div style={{"width":"800px"}} id="chart"></div>
                 </div>
            </main> )
    }
}
