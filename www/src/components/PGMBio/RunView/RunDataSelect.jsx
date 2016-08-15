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
            dataspace={this.props.dataspace}
            observations={this.props.observations}/>
         </div>
      </div>
    );
  }
}
