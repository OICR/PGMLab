import React from 'react'

import {ControlPanel} from './ControlPanel.jsx'
var graphvis = require('../bin/graphvis.js');

export class Body extends React.Component {

    componentDidMount () {
        this.props.setActivePathway(this.props.activePathway, this);
    }

    render () {
        return (
            <main className="row">
                     
                <ControlPanel pairwiseInteractions            = {this.props.pairwiseInteractions} 
                              observeNode                     = {this.props.observeNode}
                              removeObservedNode              = {this.props.removeObservedNode}
                              selectedObservationSetLearning  = {this.props.selectedObservationSetLearning}
                              selectedObservationSetInference = {this.props.selectedObservationSetInference}
                              observationList                 = {this.props.observationList}
                              runInference                    = {this.props.runInference}
                              setNodeState                    = {this.props.setNodeState}
                              removeSelectedPathwayInference  = {this.props.removeSelectedPathwayInference}
                              selectPathwayInference          = {this.props.selectPathwayInference}
                              selectedPathwaysInference       = {this.props.selectedPathwaysInference}
                              removeSelectedPathwayLearning   = {this.props.removeSelectedPathwayLearning}
                              selectPathwayLearning           = {this.props.selectPathwayLearning}
                              selectedPathwaysLearning        = {this.props.selectedPathwaysLearning}
                              pathways                        = {this.props.pathways}
                              activePathway                   = {this.props.activePathway}
                              setActivePathway                = {this.props.setActivePathway} />

                <div className="col s8">
                    <nav style={{"width":"800px"}} className="light-blue lighten-1">
                        <div className="nav-wrapper">
                          <div>
                            <a href="#!" style={{paddingLeft: "10px"}} className="breadcrumb">Viewing: {this.props.activePathway.name}</a>
                          </div>
                        </div>
                     </nav>
                     <div style={{"width":"800px"}} id="chart"></div>
                 </div>
            </main> )
    }
}
