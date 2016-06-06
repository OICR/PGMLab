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
            posteriorProbabilities={this.props.posteriorProbabilities}
            setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
        <div className="divider" /><div className="divider" />
      </div>
    );
  }
}
