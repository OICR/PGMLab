import React from 'react'

//import {Settings} from './Settings.jsx'
import {ControlPanel} from './ControlPanel.jsx'

var graphvis = require('../bin/graphvis.js');
//var graph = require('../bin/graph.js');

export class Content extends React.Component {
    componentDidMount () {
        graphvis.render(this.props.pairwiseInteractions);
    }
    render () {
        return (
            <div id="section">
                <div id="tabs-component" className="col s18 m5">
                     
                    <ControlPanel pairwiseInteractions = {this.props.pairwiseInteractions} 
                                  mutateGene           = {this.props.mutateGene}
                                  removeMutatedGene    = {this.props.removeMutatedGene}
                                  mutatedGenes         = {this.props.mutatedGenes}
                                  activePathway        = {this.props.activePathway} />
                </div>

                 <div className="col s18 m8 l8">
                               <div style={{width:"800px"}} id="chart"></div>
                 </div>
                 <br></br>
                 <div className="section"></div>
            </div>
        );
    }
}
