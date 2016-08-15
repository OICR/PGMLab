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
            observations={this.props.observations}
            dataspace={this.props.dataspace}
            selectObservationSet={this.props.selectObservationSet}
            selectObservations={this.props.selectObservations}
            />
        </div>
        <div className="col s8">
          <GraphPanel />
        </div>
      </div>
    );
  }
}
