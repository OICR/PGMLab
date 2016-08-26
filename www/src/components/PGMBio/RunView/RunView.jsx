import React from "react"

import GraphPanel from "./GraphPanel.jsx"
import RunControlPanel from "./RunControlPanel.jsx"

import RaisedButton from "material-ui/RaisedButton"

export default class RunView extends React.Component {
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s4">
          <RunControlPanel
              runType = {this.props.runType}
              changeRunType = {this.props.changeRunType}

              dataspace = {this.props.dataspace}
              dataspaceModals = {this.props.dataspaceModals}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}

              observations = {this.props.observations}
              selectObservationSet = {this.props.selectObservationSet}
              selectObservation = {this.props.selectObservation}

              pathways = {this.props.pathways}
              updatePathwaysModalFilters = {this.props.updatePathwaysModalFilters}
              selectPathway = {this.props.selectPathway}
              getReactomePathway = {this.props.getReactomePathway}

              onInferenceSuccess = {this.props.onInferenceSuccess}
          />
        </div>
        <div className="col s8">
          <GraphPanel
              dataspace = {this.props.dataspace}

              graphVis = {this.props.graphVis}
              graphVisSelectPathway = {this.props.graphVisSelectPathway}
              graphVisSelectObservation = {this.props.graphVisSelectObservation}
          />
        </div>
      </div>
    );
  }
}
