import React from "react";

import SelectPosteriorProbabilities from "./SelectPosteriorProbabilities.jsx";

import {SelectField, MenuItem} from "material-ui";

export default class ResultsControlPanel extends React.Component {
  constructor(props){
    super(props);
  }

  // RENDERING
  render(){
    return (
      <div className="card">
        <div className="card-content row center-align">
          <div className="col s4">
            <SelectPosteriorProbabilities
              posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}/>
          </div>
          <div className="col s4">
            <div className="btn">
              {"State dropdown"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
