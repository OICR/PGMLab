import React from "react";
import GraphPanel from "./GraphPanel.jsx";
import RunControlPanel from "./RunControlPanel.jsx";

import RaisedButton from "material-ui/RaisedButton";

export default class RunView extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row">
        <div className="col s4">
          <RunControlPanel
              runType={this.props.runType}
              changeRunType={this.props.changeRunType}
              dataspace={this.props.dataspace}
              dataspaceModals = {this.props.dataspaceModals}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}
              observations={this.props.observations}
              selectObservationSet={this.props.selectObservationSet}
              selectObservation={this.props.selectObservation}
              pathways={this.props.pathways}
              selectPathway={this.props.selectPathway}
              getReactomePathway = {this.props.getReactomePathway}
          />
        </div>
        <div className="col s8">
          <GraphPanel
              dataspace={this.props.dataspace}
              graphVis = {this.props.graphVis}
              graphVisSelectPathway = {this.props.graphVisSelectPathway}
              graphVisSelectObservation = {this.props.graphVisSelectObservation}
          />
        </div>
      </div>
    );
  }
}
