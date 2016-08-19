import React from "react";
import PathwaySelect from "./PathwaySelect.jsx";
import ObservationSelect from "./ObservationSelect.jsx";

export default class RunDataSelect extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row center-align">
        <div className="col s12">
          <PathwaySelect
              dataspace={this.props.dataspace}
              pathways={this.props.pathways}
              selectPathway={this.props.selectPathway}
              getReactomePathway = {this.props.getReactomePathway}
          />
          <ObservationSelect
              dataspace={this.props.dataspace}
              observations={this.props.observations}
              selectObservationSet = {this.props.selectObservationSet}
              selectObservation={this.props.selectObservation}
          />
         </div>
      </div>
    );
  }
}
