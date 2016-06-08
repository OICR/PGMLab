import React from "react";

import {Menu, MenuItem, Paper} from "material-ui";

export class InferencePosteriorProbabilities extends React.Component {
  constructor(props){
    super(props);

    this.selectPostProbs = this.selectPostProbs.bind(this);
    this.postProbsSetList = this.postProbsSetList.bind(this);
  }

  selectPostProbs(pp){
    console.log("selectPostProbs:", pp);
    // this.props.setActivePosteriorProbability(id,index);
    this.props.selectPostProbs(pp)
  }

  // RENDERING
  postProbsSetList(){
    const posteriorProbabilitiesMap = this.props.posteriorProbabilitiesMap;
    const postProbsSets = [...posteriorProbabilitiesMap.get("All").values()]
      .filter(pp => pp.type === "Run")
      .map(pp => (
        <a key={pp.id} className="collection-item grey-text" onClick={()=>{this.selectPostProbs(pp)}}>
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
      <div className="row">
        <div className="col s12 center-align chip grey lighten-5">Posterior Probabilities</div>
        <div className="collection">
          {
            postProbsSetList.length===0 ? emptyPrompt:postProbsSetList
          }
        </div>
      </div>
    );
  }
}
