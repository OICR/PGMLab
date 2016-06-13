import React from "react";

import {Menu, MenuItem, Paper} from "material-ui";

export class InferencePosteriorProbabilities extends React.Component {
  constructor(props){
    super(props);

    this.handleSetActivePostProbs = this.handleSetActivePostProbs.bind(this);
    this.postProbsSetList = this.postProbsSetList.bind(this);
  }

  handleSetActivePostProbs(ppID){
    // console.log("handleSetActivePostProbs:", ppID);
    this.props.setActivePosteriorProbability(ppID);
  }

  // RENDERING
  postProbsSetList(){
    const postProbsMap = this.props.posteriorProbabilitiesMap;
    const postProbsSets = [...postProbsMap.get("All").values()]
      .filter(pp => pp.type === "Run")
      .map(pp => (
        <a key={pp.id} className="collection-item grey-text" onClick={()=>{this.handleSetActivePostProbs(pp.id)}}>
          {"ID: "}<span className="black-text">{pp.id}<br/></span>
          {"Observation Set: "}<span className="black-text">{pp.observationSet.name}<br/></span>
          {"Number of Pathways: "}<span className="black-text">{Object.keys(pp).length}<br/></span>
          {"Run submitted: "}<span className="black-text">{pp.dateTime}</span>
        </a>
      ));
    return postProbsSets;
  }
  render(){
    const emptyPrompt = (
      <div className="collection-item center-align" style={{"paddingBottom":"0px", "paddingTop":"0px"}}>
        <span>No posterior probability sets to show</span>
      </div>
    );
    const postProbsSetList = this.postProbsSetList();
    return (
      <div className="section">
        <div className="card-panel">
          <div className="center-align">
            <div className="chip grey lighten-5">
              Posterior Probabilities
            </div>
          </div>
          <div className="collection">
            { postProbsSetList.length===0 ? emptyPrompt:postProbsSetList }
          </div>
        </div>
      </div>
    );
  }
}
