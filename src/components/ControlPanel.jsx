import React from 'react'

import {GeneList} from './GeneList.jsx';
import {ObservedNodeList} from './ObservedNodeList.jsx';

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class ControlPanel extends React.Component {

    render() {
    console.log("ControlPanel", this.props)
        var activePathway = this.props.activePathway.name
        var self = this;
        return (
            <div>
                <div id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "288px"}}>Select Pathway</div> 
                <br /><br />
                <div className="orange btn white-text" style={{width: "288px"}}>Current Pathway</div> 
                <div id="side-nav-open" href="#" className="waves-effect waves-light white black-text" style={{width: "300px", textAlign:"center"}}>{activePathway}</div> 
                <br /><br />
                <div className="orange btn white-text" style={{width: "288px"}}>Observed Data</div> 
                <ObservedNodeList observedNodes       = {this.props.observedNodes}
                                  setNodeState        = {this.props.setNodeState}
                                  removeObservedNode  = {this.props.removeObservedNode} />
                <br />
                <div className="orange btn white-text" style={{width: "288px"}}>Mutate Genes</div> 
                <GeneList observeNode           = {this.props.observeNode} 
                          observedNodes         = {this.props.observedNodes}
                          pairwiseInteractions  = {this.props.pairwiseInteractions} />
                <br /><br />
                <div className="waves-effect waves-light orange btn white-text" style={{width: "300px"}} onClick={self.props.runInference}>Predict Impact</div> 
            </div> )
    }

}
