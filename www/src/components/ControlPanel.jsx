import React from 'react'

import {GeneList} from './GeneList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'

import {ControlPanelLearning} from "./ControlPanelLearning.jsx"
import {ControlPanelInference} from "./ControlPanelInference.jsx"

import {UploadModal} from "./UploadModal.jsx"

export class ControlPanel extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {"toggle": "inference"}
    }

    componentDidUpdate() {
  //      $('.tooltipped').tooltip({delay: 50})
    //    $('input#input_text, textarea#textarea1').characterCounter()
    }

    toggleClick() {
        this.setState({ "toggle": (this.state.toggle == "inference")? "learning": "inference"})
    }

    render() {
        var runPanel = (this.state.toggle ==="inference")? 
                    <ControlPanelInference setActivePathway                = {this.props.setActivePathway} 
                                           activePathway                   = {this.props.activePathway} 
                                           selectedObservationSetInference = {this.props.selectedObservationSetInference}
                                           observationList                 = {this.props.observationList}
                                           selectPathwayInference          = {this.props.selectPathwayInference}
                                           removeSelectedPathwayInference  = {this.props.removeSelectedPathwayInference}
                                           selectedPathwaysInference       = {this.props.selectedPathwaysInference}
                                           pathways                        = {this.props.pathways} />
                    :
                    <ControlPanelLearning setActivePathway                = {this.props.setActivePathway} 
                                          activePathway                   = {this.props.activePathway} 
                                          selectedObservationSetLearning  = {this.props.selectedObservationSetLearning}
                                          observationList                 = {this.props.observationList}
                                          selectPathwayLearning           = {this.props.selectPathwayLearning}
                                          removeSelectedPathwayLearning   = {this.props.removeSelectedPathwayLearning}
                                          selectedPathwaysLearning        = {this.props.selectedPathwaysLearning}
                                          pathways                        = {this.props.pathways} /> 

        var activePathway = this.props.activePathway.name

        return (
                <div className="col s4" style={{minWidth:"300px"}}>
                    <div className="section row">
                        <div className="switch col s8" >
                            <label>
                                Inference
                            <input type="checkbox" />
                            <span className="lever" onClick={this.toggleClick.bind(this)} />
                                Learning
                            </label>
                        </div>
                        <div className="col s2 push-s2"> 
                            <UploadModal />
                            <a className="modal-trigger" href="#uploadModal1"><i style={{paddingRight: "20px"}} className="material-icons dp48">open_in_browser</i></a>
                        </div>
                    </div>
                    <div className="divider"></div>
                         {runPanel}
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
