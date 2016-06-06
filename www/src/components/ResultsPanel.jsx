import React from "react";

import {PosteriorProbabilitiesControl} from "./PosteriorProbabilitiesControl.jsx";

export class ResultsPanel extends React.Component {
  constructor(props){
    super(props);
  }

  // RENDERING
  render(){
    return (
      <div>
        <PosteriorProbabilitiesControl
            posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
            setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
      </div>
    );
  }
}
