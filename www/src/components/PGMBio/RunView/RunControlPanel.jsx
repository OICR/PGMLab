import React from "react";
import RunTypeSelect from "./RunTypeSelect.jsx";
import RunDataSelect from "./RunDataSelect.jsx";

export default class RunControlPanel extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="card-panel">
        <RunTypeSelect />
        <RunDataSelect
            dataspace={this.props.dataspace}
            observations={this.props.observations}
            selectObservationSet = {this.props.selectObservationSet}
            selectObservations={this.props.selectObservations}
            pathways={this.props.pathways}

        />
      </div>
    )
  }
}
