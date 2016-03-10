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
                <div className="orange btn white-text" style={{padding:0,margin:0,width: "288px"}}><i style={{paddingRight: "20px"}} className="material-icons dp48">clear_all</i>           <span style={{paddingLeft:"20px", paddingRight: "40px"}}>Observed Data</span></div> 
                <ObservedNodeList observedNodes       = {this.props.observedNodes}
                                  setNodeState        = {this.props.setNodeState}
                                  removeObservedNode  = {this.props.removeObservedNode} />
                <br />
                <div className="orange btn white-text" style={{width: "288px"}}>Mutate Genes</div> 
                <GeneList observeNode           = {this.props.observeNode} 
                          observedNodes         = {this.props.observedNodes}
                          pairwiseInteractions  = {this.props.pairwiseInteractions} />
                <br />
                <h5>Or</h5>
                <form action="#">
                   <div className="file-field input-field">
                      <div className="btn">
                        <span>Upload Posterior Probability File</span>
                        <input type="file"></input>
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"></input>
                      </div>
                   </div>
                   <button type="button">Submit</button>
                </form>
                <div className="waves-effect waves-light orange btn white-text" style={{width: "300px"}} onClick={self.props.runInference}>Predict Impact</div> 
                
                        </div> )
    }

}
