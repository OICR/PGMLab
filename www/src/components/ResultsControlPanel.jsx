import React from "react";

import {InferencePosteriorProbabilities} from "./InferencePosteriorProbabilities.jsx";

import {SelectField, MenuItem} from "material-ui";

export class ResultsControlPanel extends React.Component {
  constructor(props){
    super(props);

    this.heatmapCard = this.heatmapCard.bind(this);
  }
  componentDidMount(){
    $("ul.tabs").tabs();
  }

  // RENDERING
  heatmapCard(){
    const postProbsMap = this.props.posteriorProbabilitiesMap;
    const activePostProb = postProbsMap.get("Active");
    const postProbPrompt = activePostProb===null ?
      "Select a posterior probability set below":activePostProb.id;
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12">
          <div className="card">
            <div className="card-content row center-align">
              <div className="col s12 chip">
                { postProbPrompt }
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  render(){
    return (
      <div>
        {this.heatmapCard()}
        <InferencePosteriorProbabilities
            posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
            setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
      </div>
    );
  }
}
