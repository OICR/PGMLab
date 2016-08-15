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
          <PathwaySelect />
          <ObservationSelect
            observations={this.props.observations}
            dataspace={this.props.dataspace}
            selectObservationSet = {this.props.selectObservationSet}
            selectObservations={this.props.selectObservations}
          />
         </div>
      </div>
    );
  }
}
