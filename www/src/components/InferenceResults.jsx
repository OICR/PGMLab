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
    const selectedPostProbs = this.state.selectedPostProbs;
    const [postProbsPrompt, children] = selectedPostProbs===null ?
      [
        "Select a posterior probability set below",
        undefined
      ]:[
        this.state.selectedPostProbs.id,
        [...Object.keys(selectedPostProbs.selectedPathways)]
          .map(k => selectedPostProbs.selectedPathways[k])
          .map(pathway => {
            console.log(pathway);
            return (
              <MenuItem key={pathway.id} value={pathway} primaryText={pathway.name} />
            );
          })
      ];
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12">
          <div className="card">
            <div className="card-content row center-align" style={{paddingBottom:"0px"}}>
              <div className="col s12 chip">
                {postProbsPrompt}
              </div>
              <div className="col s12">
                {
                  selectedPostProbs===null ?
                    undefined
                    :
                    <SelectField  value={this.state.selectedPathway}
                                  onChange={(evt,idx,val) => {this.selectPathway(val)}}
                                  autoWidth={true}
                                  style={{width:"100%"}}
                                  children={children} />
                }
              </div>
            </div>
            <div className="card-action center-align">
              <a href="#!">Generate Heatmap</a>
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
            selectPostProbs={this.selectPostProbs}
            posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
            setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
      </div>
    );
  }
}
