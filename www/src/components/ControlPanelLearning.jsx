import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'

import {SelectObservationSet} from './SelectObservationSet.jsx'
import {SelectedObservationSet} from './SelectedObservationSet.jsx'

export class ControlPanelLearning extends React.Component {

    componentDidMount() {
        $('.collapsibleLearning').collapsible({accordion : true})
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
                   
                    <ul className="collapsible collapsibleLearning" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">visibility</i>Observation Sets</div>
                            <div className="collapsible-body">
                                <SelectObservationSet 
                                        type                   = "learning"
                                        selectedObservationSet = {this.props.selectedObservationSetLearning} 
                                        observationList        = {this.props.observationList}/>
                            </div>
                        </li>
                    </ul>
                    <ul className="collapsible collapsibleLearning" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">group_work</i>Pathways</div>
                            <div className="collapsible-body">
                                <SelectPathways setActivePathway      = {this.props.setActivePathway} 
                                                activePathway         = {this.props.activePathway} 
                                                selectPathway         = {this.props.selectPathwayLearning}
                                                removeSelectedPathway = {this.props.removeSelectedPathwayLearning}
                                                selectedPathways      = {this.props.selectedPathwaysLearning}
                                                pathways              = {this.props.pathways} 
                                                runType               = "learning" />
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
                    <SelectedObservationSet selectedObservationSet = {this.props.selectedObservationSetLearning}
                                            setNodeState           = {this.props.setNodeState}
                                            observeNode            = {this.props.observeNode}
                                            pairwiseInteractions   = {this.props.pairwiseInteractions}
                                            removeObservedNode     = {this.props.removeObservedNode} />
                    <h5>Selected Pathway(s)</h5>
                    <SelectedPathways pathways         = {this.props.pathways}
                                      activePathway    = {this.props.activePathway}
                                      setActivePathway = {this.props.setActivePathway}
                                      type             = "learning"
                                      selectedPathways = {this.props.selectedPathwaysLearning} />
               </div>
                <div className="divider"></div>
                <div className="section">
                    <i className="material-icons tiny right">settings</i>
                    <a className="waves-effect waves-light btn" onClick={this.runLearning}>Run</a>
                </div>
                <div className="section">
                    <h5>Results:</h5>
                    <ul className="collapsible" data-collapsible="accordion">
                        <li>
                            <div className="collapsible-header"><i className="material-icons">assessment</i>Estimated Parmeters</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>EstimatedParameters1</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>)
    }
}
