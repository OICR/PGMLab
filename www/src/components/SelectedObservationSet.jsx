import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'

export class SelectedObservationSet extends React.Component {

    render() {
        var self = this
        var observationsCount = this.props.selectedObservationSet.observations.length
        var observations = this.props.selectedObservationSet.observations.map(function(observation, index) {
                            return (<p key={index}>
                                <input name="group1" type="radio" id={index} disabled={(observationsCount <= 1)? "disabled": ""} />
                                <label htmlFor={index}>{index}</label>	
                            </p>)                        
                       })

        var activeIndex = this.props.selectedObservationSet.activeIndex
        var observed = this.props.selectedObservationSet.observations[activeIndex]
        return (
          <div>
            <div className="row">
                <p>{this.props.selectedObservationSet.name}</p>
            </div>
            <div className="row">
                <h5 className="col s11">Observation</h5>
                <a className="btn-floating btn-small waves-effect waves-light blue col s1 tooltipped" 
                                data-position="top" data-delay="50" data-tooltip="Add Observation">+</a>
            </div>
            <div className="row">
                <form action="#">
                    {observations}
                </form>
            </div>
            <div className="row">
                <div className="blue btn white-text col s12" >Observed Nodes</div> 
            </div>
            <div className="row"> 
                <ObservedNodeList observedNodes       = {observed.nodes}
                                  setNodeState        = {this.props.setNodeState}
                                  removeObservedNode  = {this.props.removeObservedNode} />
            </div>
            <div className="row">
                <div className="blue btn white-text col s12">Mutate Genes</div> 
            </div>
            <div className="row">
                <GeneList observeNode           = {this.props.observeNode} 
                          observedNodes         = {observed.nodes}
                          pairwiseInteractions  = {this.props.pairwiseInteractions} />
 
            </div>
         </div> )
    }
}
