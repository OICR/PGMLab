import React from "react"
import {is} from "immutable"
import RunTypeSelect from "./RunTypeSelect.jsx"
import RunDataSelect from "./RunDataSelect.jsx"
import DataspaceControl from "./DataspaceControl.jsx"

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
        {
          !is(this.props.dataspace.get("pathways").size,0) &&
          !is(this.props.dataspace.getIn(["observationSet", "_id"]),"") ?
            <DataspaceControl
                dataspace={this.props.dataspace}
            />
            : <h6 className="center-align">{"Select some data"}</h6>
        }
      </div>
    )
  }
}
