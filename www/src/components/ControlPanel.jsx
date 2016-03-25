import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class ControlPanel extends React.Component {
    componentDidMount(){
        $(document).ready(function(){
            $('.collapsible').collapsible({
              accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            })

            $('input#input_text, textarea#textarea1').characterCounter()
        })
    }
    render() {
        var activePathway = this.props.activePathway.name
        var self = this;
        return (
               <div className="col s4" style={{minWidth:"300px"}}>
                    <div className="section">
                        <h5>Pathways</h5>
                        <p>SelectedPathways</p>
                        <ul>
                            <li>Pathway One</li>
                            <li>Pathway Two</li>
                        </ul>
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">group_work</i>Select Pathway</div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>Create Pathway</li>
                                        <li>Upload pathway</li>
                                        <li><h6>Pathway list</h6>
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
                                                                  <input type="checkbox" className="filled-in" id="filled-in-box" />
                                                                  <label htmlFor="filled-in-box" />
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
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <h5>Observations</h5>
                        <ul>
                            <li>Obersvation One</li>
                        </ul>
                        <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">visibility</i>Select Observations</div>
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
                                                                  <input type="checkbox" className="filled-in" id="filled-in-box" />
                                                                  <label htmlFor="filled-in-box" />
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
                          <a className="waves-effect waves-light btn">Run Learning</a>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                             <p>Selected Pathways htmlFor Inference</p>
                          <ul className="collapsible" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">group_work</i>Select Pathway Set</div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>Create New Observation</li>
                                        <li>Upload Observation</li>
                                        <li><h6>Learnt Pathway List</h6>
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
                                                                  <input type="radio" id="fg-1" />
                                                                  <label htmlFor="fg-1" />
                                                             </form>
                                                        </td>
                                                        <td>learntfg 1</td>
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
                        <a className="waves-effect waves-light btn">Run Inference</a>
                    </div>
                    <ul className="collection with-header">
                        <li className="collection-header"><h6>Posterior Probability Sets</h6></li>
                        <li className="collection-item">pp 1</li>
                        <li className="collection-item">pp 2</li>
                        <li className="collection-item">pp 3</li>
                        <li className="collection-item">pp 4</li>
                    </ul>
               </div>)
    }
}
/*
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
