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
        return (
            <main className="row">
                     
                <ControlPanel pairwiseInteractions            = {this.props.pairwiseInteractions}
                              toggleClick                     = {this.toggleClick}
                              toggle                          = {this.state.toggle}
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
                            <a href="#!" style={{paddingLeft: "10px"}} className="breadcrumb">{this.state.toggle}</a>
                            <a href="#!" 
                               style={{paddingLeft: "10px"}}
                               className="breadcrumb">Observation Set: {(this.toggle === "Inference")? 
                                                                                 this.props.selectedObservationSetLearning.name :
                                                                                 this.props.selectedObservationSetInference.name}
                            </a>
                            <a href="#!" 
                               style={{paddingLeft: "10px"}} 
                               className="breadcrumb">{(this.state.toggle ==="inference")? 
                                                                                 this.props.selectedObservationSetLearning.id :
                                                                                 this.props.selectedObservationSetInference.id}
                            </a>
                           <a href="#!" style={{paddingLeft: "10px"}} className="breadcrumb">Pathway: {this.props.activePathway.name}</a>
                          </div>
                        </div>
                     </nav>
                     <div style={{"width":"800px"}} id="chart"></div>
                 </div>
            </main> )
    }
}
