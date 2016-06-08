import React from 'react';

import {DataSelection} from "./DataSelection.jsx";
import {ObservationsControl} from "./ObservationsControl.jsx";
import {PathwaysControl} from "./PathwaysControl.jsx";

export class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.handleRun = this.handleRun.bind(this);
  }
  componentDidMount(){
    console.log("Control Mount");
    $("ul.tabs").tabs()
  }
  handleRun(){
    switch (this.props.runType) {
      case "Inference":
        this.props.runInference(); break;
      case "Learning":
        console.log("runLearning"); break;
    };
  }
  render(){
    // console.log("<ControlPanel> render()");
    return (
    <div>
      <DataSelection  observationMap = {this.props.observationMap}
                      selectObservationSet = {this.props.selectObservationSet}
                      selectObservations = {this.props.selectObservations}
                      removeSelectedObservations = {this.props.removeSelectedObservations}
                      pathwayMap = {this.props.pathwayMap}
                      selectPathways = {this.props.selectPathways}
                      removeSelectedPathways = {this.props.removeSelectedPathways} />
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6">
              <a href="#ObservationsControl">Observations</a>
            </li>
            <li className="tab col s6">
              <a href="#PathwaysControl">Pathways</a>
            </li>
          </ul>
        </div>
        <ObservationsControl  pairwiseInteractions={this.props.pairwiseInteractions}
                              observationMap = {this.props.observationMap}
                              setActiveObservation = {this.props.setActiveObservation}
                              setNodeItemState = {this.props.setNodeItemState} />
        <PathwaysControl  pairwiseInteractions={this.props.pairwiseInteractions}
                          observationMap = {this.props.observationMap}
                          pathwayMap = {this.props.pathwayMap}
                          setActivePathway = {this.props.setActivePathway}
                          setNodeItemState = {this.props.setNodeItemState} />
      </div>
      <div className="section" style={{paddingBottom:"0px",paddingTop:"0px"}}>
        <div className="card-panel center-align">
          <a className="waves-effect waves-light btn" onClick={this.handleRun}>Run</a>
        </div>
      </div>
    </div>
    )
  }
}
