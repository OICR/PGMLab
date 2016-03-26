import React from 'react'

//import {Settings} from './Settings.jsx'
import {ControlPanel} from './ControlPanel.jsx'

var graphvis = require('../bin/graphvis.js');
//var graph = require('../bin/graph.js');

export class Body extends React.Component {
    componentDidMount () {
        this.props.setActivePathway(this.props.activePathway, this);
    }
    render () {
        console.log("Body", this.props)
        return (
            <main className="row">
                     
                 <ControlPanel pairwiseInteractions           = {this.props.pairwiseInteractions} 
                               observeNode                    = {this.props.observeNode}
                               removeObservedNode             = {this.props.removeObservedNode}
                               observedNodes                  = {this.props.observedNodes}
                               runInference                   = {this.props.runInference}
                               setNodeState                   = {this.props.setNodeState}
                               removeSelectedPathwayInference = {this.props.removeSelectedPathwayInference}
                               selectPathwayInference         = {this.props.selectPathwayInference}
                               selectedPathwaysInference      = {this.props.selectedPathwaysInference}
                               removeSelectedPathwayLearning  = {this.props.removeSelectedPathwayLearning}
                               selectPathwayLearning          = {this.props.selectPathwayLearning}
                               selectedPathwaysLearning       = {this.props.selectedPathwaysLearning}
                               pathways                       = {this.props.pathways}
                               activePathway                  = {this.props.activePathway}
                               setActivePathway               = {this.props.setActivePathway} />

                 <div className="col s8">
                      <div style={{width:"800px"}} id="chart"></div>
                 </div>
            </main>
        );
    }
}
