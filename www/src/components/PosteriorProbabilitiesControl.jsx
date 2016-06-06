import React from "react";

import {Menu, MenuItem, Paper} from "material-ui";

export class PosteriorProbabilitiesControl extends React.Component {
  constructor(props){
    super(props);

    this.showPostProbs = this.showPostProbs.bind(this);
    this.postProbsSetList = this.postProbsSetList.bind(this);
  }

  showPostProbs(id, index){
    console.log("showPostProbs:", id, index);
    this.props.setActivePosteriorProbability(id,index);
  }

  // RENDERING
  postProbsSetList(){
    const posteriorProbabilitiesMap = this.props.posteriorProbabilitiesMap;
    const runSets = [...posteriorProbabilitiesMap.get("All").values()]
      .filter(ppSet => ppSet.type === "Run")
      .map(ppSet => (
        <a key={ppSet.id} className="collection-item black-text">
            <strong>{ppSet.id}</strong><br/>
              Observation Set: {ppSet.observationSet.name}<br/>
              Run submitted: {ppSet.dateTime}
        </a>
      ));
    return (
      <div className="collection">
        {runSets}
      </div>
    );
  }
  render(){
    return (
      <div className="section">
        <h5>Posterior Probability Sets</h5>
        <div className="row">
            {this.postProbsSetList()}
        </div>
      </div>
    );
  }
}
