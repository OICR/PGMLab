import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'

import {SelectObservationSet} from './SelectObservationSet.jsx'
import {SelectedObservationSet} from './SelectedObservationSet.jsx'

export class ControlPanelInference extends React.Component {

    componentDidMount() {
        $('.collapsibleInference').collapsible({accordion : true})
    }

    componentDidUpdate() {
        $('.tooltipped').tooltip({delay: 50})
        $('input#input_text, textarea#textarea1').characterCounter()
    }

    render() {
        var activePathway = this.props.activePathway.name
        return (
            <div>
                <div className="section">
                    <h5>Data Selection</h5>
                    <ul className="collapsible collapsibleInference" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">visibility</i>Observation Sets</div>
                            <div className="collapsible-body">
                                <SelectObservationSet
                                         type                            = "inference"
                                         selectedObservationSetInference = {this.props.selectedObservationSetInference}
                                         observationList                 = {this.props.observationList} />
                           </div>
                        </li>
                    </ul>
                    <ul className="collapsible collapsibleInference" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">group_work</i>Pathways</div>
                            <div className="collapsible-body">
                                <SelectPathways setActivePathway      = {this.props.setActivePathway}
                                                activePathway         = {this.props.activePathway}
                                                selectPathway         = {this.props.selectPathwayInference}
                                                removeSelectedPathway = {this.props.removeSelectedPathwayInference}
                                                selectedPathways      = {this.props.selectedPathwaysInference}
                                                pathways              = {this.props.pathways}
                                                runType               = "inference" />
                           </div>
                        </li>
                    </ul>
               </div>
                <div className="divider"></div>
                <div className="section">
                    <div className="row"> 
                        <h5 className="col s11">Selected Observation Set</h5>
                        <a className="btn-floating btn-small waves-effect waves-light blue col s1 tooltipped"
                                            data-position="top" data-delay="50" data-tooltip="Create Observation Set">+</a>
                    </div>
                    <SelectedObservationSet selectedObservationSet = {this.props.selectedObservationSetInference} 
                                            setNodeState           = {this.props.setNodeState}
                                            observeNode            = {this.props.observeNode}
                                            pairwiseInteractions   = {this.props.pairwiseInteractions}
                                            removeObservedNode     = {this.props.removeObservedNode} />
                    <h5>Selected Pathway(s)</h5>
                    <SelectedPathways pathways         = {this.props.pathways}
                                      activePathway    = {this.props.activePathway}
                                      setActivePathway = {this.props.setActivePathway}
                                      type             = "inference"
                                      selectedPathways = {this.props.selectedPathwaysInference} />

                </div>
                <div className="section">
                    <i className="material-icons tiny right">settings</i>
                    <a className="waves-effect waves-light btn" onClick={this.runInference}>Run</a>
                </div>
                <div className="divider"></div>
                <div className="section">
                   <h5>Results:</h5>
                    <ul className="collapsible" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">assessment</i>Posterior Probability Sets</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li>pp 1</li>
                                    <li>pp 2</li>
                                    <li>pp 3</li>
                                    <li>pp 4</li>
                                </ul>
                            </div>
                       </li>
                    </ul>
                </div>
            </div>)
    }
}
         //           <SelectedObservationSet name = {this.props.selectedObservationSetInference} />
