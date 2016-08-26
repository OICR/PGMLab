import React from "react"

import PathwaySelect from "./PathwaySelect.jsx"
import ObservationSelect from "./ObservationSelect.jsx"

export default class RunDataSelect extends React.Component {
  render(){
    return (
      <div className="row center-align">
        <div className="col s12">
          <PathwaySelect
              dataspace = {this.props.dataspace}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}

              pathwaysModal = {this.props.dataspaceModals.get("pathwaysModal")}
              pathways = {this.props.pathways}
              updatePathwaysModalFilters = {this.props.updatePathwaysModalFilters}
              selectPathway = {this.props.selectPathway}
              getReactomePathway = {this.props.getReactomePathway}
          />
          <ObservationSelect
              dataspace = {this.props.dataspace}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}

              observationSetModal = {this.props.dataspaceModals.get("observationSetModal")}
              observations = {this.props.observations}
              selectObservationSet = {this.props.selectObservationSet}
              selectObservation = {this.props.selectObservation}
          />
         </div>
      </div>
    );
  }
}
