import React from "react"
import RaisedButton from "material-ui/RaisedButton"
import {is} from "immutable"
import RunTypeSelect from "./RunTypeSelect.jsx"
import RunDataSelect from "./RunDataSelect.jsx"
import DataspaceControl from "./DataspaceControl.jsx"

class RunSubmit extends React.Component {
  render(){
    return (
      <div className="row">
        <RaisedButton className="col s12">
          {"RUN"}
        </RaisedButton>
      </div>
    )
  }
}

export default class RunControlPanel extends React.Component {
  render(){
    return (
      <div className="card-panel">
        <RunTypeSelect
            runType={this.props.runType}
            changeRunType = {this.props.changeRunType}
        />
        <RunDataSelect
            dataspace={this.props.dataspace}
            dataspaceModals = {this.props.dataspaceModals}
            toggleDataspaceModal = {this.props.toggleDataspaceModal}
            updatePathwaysModalFilters = {this.props.updatePathwaysModalFilters}
            observations={this.props.observations}
            selectObservationSet = {this.props.selectObservationSet}
            selectObservation={this.props.selectObservation}
            pathways={this.props.pathways}
            selectPathway={this.props.selectPathway}
            getReactomePathway = {this.props.getReactomePathway}
        />
        <DataspaceControl
            dataspace={this.props.dataspace}
        />

      </div>
    )
  }
}
