import React from "react";

import {InferencePosteriorProbabilities} from "./InferencePosteriorProbabilities.jsx";

import {SelectField, MenuItem} from "material-ui";

export class InferenceResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //sets activePostProbs in map after clicking heatmap
      selectedPostProbs: null,
      selectedPathway: null
    };

    this.selectPostProbs = this.selectPostProbs.bind(this);
    this.selectPathway = this.selectPathway.bind(this);

    this.heatmapCard = this.heatmapCard.bind(this);
    this.selectFieldPathway = this.selectFieldPathway.bind(this);
  }
  componentDidMount(){
    $("ul.tabs").tabs();
  }
  selectPostProbs(selectedPostProbs){
    this.setState({
      selectedPostProbs,
      selectedPathway: null
    });
  }
  selectPathway(selectedPathway){
    console.log(selectedPathway)
    this.setState({
      selectedPathway
    });
  }

  // RENDERING
  selectFieldPathway(){
    const selectedPostProbs = this.state.selectedPostProbs;
    const children = selectedPostProbs===null ?
      []:
      [...Object.keys(selectedPostProbs.selectedPathways)]
        .map(k => selectedPostProbs.selectedPathways[k])
        .map(pathway => {
          console.log(pathway);
          return (
            <MenuItem key={pathway.id} value={pathway} primaryText={pathway.name} />
          );
        });
    return (
      selectedPostProbs===null ?
        undefined:
        <SelectField  value={this.state.selectedPathway}
                      onChange={(evt,idx,val) => {this.selectPathway(val)}}
                      autoWidth={true}
                      style={{width:"100%"}}
                      children={children} />
    );
  }
  heatmapCard(){
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content row center-align" style={{paddingBottom:"0px"}}>
              <div className="col s12 chip">
                {
                  this.state.selectedPostProbs===null ?
                  "Select a posterior probability set below":
                  this.state.selectedPostProbs.id
                }
              </div>
              <div className="col s12">
                {this.selectFieldPathway()}
              </div>
            </div>
            <div className="card-action center-align">
              <a href="#!">Generate Heatmap</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div>
        <div className="section" style={noPad}>
          { this.heatmapCard() }
          <div className="row">
            <InferencePosteriorProbabilities
                selectPostProbs={this.selectPostProbs}
                posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
          </div>
        </div>
      </div>
    );
  }
}
