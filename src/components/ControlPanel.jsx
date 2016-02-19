import React from 'react'

import {GeneList} from './GeneList.jsx';
import {MutationList} from './MutationList.jsx';

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class ControlPanel extends React.Component {
    constructor() {
        super();
        this. _runInference = this. _runInference.bind(this);
    }
    _runInference() {
        console.log("running inference", this)
    }
    render() {
        var activePathway = this.props.activePathway.name
        var self = this;
        return (
            <div>
                <div id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "288px"}}>Select Pathway</div> 
                <br /><br />
                <div className="orange btn white-text" style={{width: "288px"}}>Current Pathway</div> 
                <div id="side-nav-open" href="#" className="waves-effect waves-light white black-text" style={{width: "300px", textAlign:"center"}}>{activePathway}</div> 
                <br /><br />
                <div className="orange btn white-text" style={{width: "288px"}}>Mutated Gene(s)</div> 
                <MutationList mutatedGenes            = {this.props.mutatedGenes}
                              removeMutatedGene       = {this.props.removeMutatedGene} />
                <br />
                <div className="orange btn white-text" style={{width: "288px"}}>Mutate Genes</div> 
                <GeneList mutateGene            = {this.props.mutateGene} 
                          mutatedGenes          = {this.props.mutatedGenes}
                          pairwiseInteractions  = {this.props.pairwiseInteractions} />
                <br /><br />
                <div className="waves-effect waves-light orange btn white-text" style={{width: "300px"}} onClick={self._runInference}>Predict Impact</div> 
            </div> )
    }
}
