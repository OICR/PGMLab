import React from 'react'

import {NodeList} from './NodeList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'
import {SelectObservation} from './SelectObservation.jsx'

export class ObservationSet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {"editObservation": "Enable"}

        this.editObservationClick = this.editObservationClick.bind(this)
    }

    editObservationClick() {
        this.setState({ "editObservation": (this.state.editObservation === "Enable")? "Disable": "Enable"})
    }

    render() {
console.log("OS", this.props)
        var self = this
        var observationsCount = this.props.observationSets[this.props.selectedObservationSet].observations.length
        var observations = this.props.observationSets[this.props.selectedObservationSet].observations.map(function(observation, index) {
                            return (<p key={index}>
                                <input name="group1" type="radio" id={index} disabled={(observationsCount <= 1)? "disabled": ""} />
                                <label htmlFor={index}>{observation.id}</label>	
                            </p>)                        
                       })
        var activeIndex = this.props.observationSets[this.props.selectedObservationSet].activeIndex
        var observed = this.props.observationSets[this.props.selectedObservationSet].observations[activeIndex]

        var editObservationView = "";
        if (this.state.editObservation === "Disable") {
            editObservationView = 
                <div>         
                    <div className="row">
                        <div className="light-blue lighten-1 btn white-text col s12 tooltipped"
                                        data-position="top" data-delay="50" data-tooltip="Only Observations in Selected Pathways will be run">Observed Nodes</div> 
                    </div>
                    <div className="row"> 
                        <ObservedNodeList observedNodes       = {observed.nodes}
                                          setNodeState        = {this.props.setNodeState}
                                          removeObservedNode  = {this.props.removeObservedNode} />
                    </div>
                    <div className="row">
                        <div className="light-blue lighten-1 btn white-text col s12 tooltipped"
                                        data-position="top" data-delay="50" data-tooltip="These nodes are from the pathway in the view">Select Nodes</div> 
                    </div>
                     <div className="row">
                        <NodeList observeNode           = {this.props.observeNode} 
                                  observedNodes         = {observed.nodes}
                                  runType               = {this.props.runType}
                                  pairwiseInteractions  = {this.props.pairwiseInteractions} />
                    </div>
                </div>
        }

        return (
          <div>
            <div className="row">
                <p>{this.props.observationSets[this.props.selectedObservationSet].name}</p>
            </div>
            <div className="row">
                <h5 className="col s11">Observation</h5>
                <a className="btn-floating btn-small waves-effect waves-light light-blue lighten-1 col s1 tooltipped" 
                                data-position="top" data-delay="50" data-tooltip="Add Observation">+</a>
            </div>
            <div className="row">
                <SelectObservation
                     type                = "inference"
                     selectedObservation = {this.props.selectedObservation}
                     selectObservation   = {this.props.selectObservation}
                     observations        = {this.props.observationSets[this.props.selectedObservationSet].observations} />
                <a className={"btn-floating btn-small waves-effect waves-light col s1 tooltipped ".concat( (this.state.editObservation === "Disable")? 
                                                                                                                "red": "ligth-blue lighten-1")} 
                                data-position="top" data-delay="50" data-tooltip={this.state.editObservation}
                                onClick={this.editObservationClick}>
                    <i className="material-icons prefix">mode_edit</i>
                </a>
            </div>
            {editObservationView}      
         </div> )
    }
}
