import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class ControlPanel extends React.Component {
    componentDidMount(){
        $(document).ready(function(){
            $('.collapsible').collapsible({
              accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            })
            $('.tooltipped').tooltip({delay: 50});
            $('input#input_text, textarea#textarea1').characterCounter()
        })
    }
    runInference() {
        Materialize.toast('Running Inference', 4000)
    }
    runLearning() {
        Materialize.toast('Running Learning', 4000)
    }
    render() {
        console.log("controlPanel", this.props)
        var activePathway = this.props.activePathway.name
        var self = this;
        return (
                <div className="col s4" style={{minWidth:"300px"}}>
                    <div className="section">
                        <h5>Upload Data</h5>
                        <form action="#">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Pathway(s)</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload pathways" />
                                </div>
                            </div>
                        </form>
                        <form action="#">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Observation(s)</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload observations" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                         <h5>Learning</h5>
                         <p><strong>Selected Pathway(s):</strong></p>
                         <SelectedPathways pathways         = {this.props.pathways}
                                           selectedPathways = {this.props.selectedPathwaysLearning} />
                         <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">group_work</i>Select Pathways</div>
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
                         <p><strong>Selected Observation Set(s):</strong></p>
                         <ul><li>Obersvation One</li></ul>
                         <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">visibility</i>Select Observation Set</div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>Create New Observation</li>
                                        <li>Upload Observation</li>
                                        <li><h6>Observation list</h6>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Select</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                             <form action="#">
                                                                  <input type="checkbox" className="filled-in" id="inferenceObservation1" />
                                                                  <label htmlFor="inferenceObservation1" />
                                                             </form>
                                                        </td>
                                                        <td>Observation 1</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <i className="material-icons tiny right">settings</i>
                        <a className="waves-effect waves-light btn" onClick={this.runLearning}>Run</a>
                        <h5>Results:</h5>
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">visibility</i>Estimated Parmeters</div>
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
                    <div className="divider"></div>
                    <div className="section">
                         <h5>Inference</h5>
                         <p><strong>Selected Pathway(s):</strong></p>
                         <SelectedPathways pathways         = {this.props.pathways}
                                           selectedPathways = {this.props.selectedPathwaysInference} />
                         <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">group_work</i>Select Pathways</div>
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
                        <p><strong>Selected Observation Set(s):</strong></p>
                        <ul><li>Obersvation One</li></ul>
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">visibility</i>Select Observation Set</div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>Create New Observation</li>
                                        <li>Upload Observation</li>
                                        <li><h6>Observation list</h6>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Select</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                             <form action="#">
                                                                  <input type="checkbox" className="filled-in" id="learningObservation1" />
                                                                  <label htmlFor="learningObservation1" />
                                                             </form>
                                                        </td>
                                                        <td>Observation 1</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
 
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <i className="material-icons tiny right">settings</i>
                        <a className="waves-effect waves-light btn" onClick={this.runInference}>Run</a>
                    </div>
                    <h5>Results:</h5>
                    <div className="section">
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">assessment</i>Posterior Probabliity Sets</div>
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
/*

                         <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">group_work</i>Select Pathways</div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Select</th>
                                                        <th>Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                             <form action="#">
                                                                  <input type="checkbox" className="filled-in" id="InfernecePathway1" />
                                                                  <label htmlFor="inferncePathway1" />
                                                             </form>
                                                        </td>
                                                        <td>Cell Cycle</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>



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
}*/
