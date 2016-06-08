import React from "react";

import {PosteriorProbabilitiesControl} from "./PosteriorProbabilitiesControl.jsx";

export class ResultsPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //sets activePostProbs in map after clicking heatmap
      selectedPostProbs: null,
      selectedPathway: null
    };

    this.selectPostProbs = this.selectPostProbs.bind(this);
    this.unselectPostProbs = this.unselectPostProbs.bind(this);

    this.chips = this.chips.bind(this);
  }
  componentDidMount(){
    $("ul.tabs").tabs();
  }
  selectPostProbs(selectedPostProbs){
    this.setState({
      selectedPostProbs
    },
    ()=>{})
  }
  unselectPostProbs(){
    this.setState({
      selectedPostProbs: null,
      selectedPathway: null
    });
  }
  selectPathway(selectedPathway){
    this.setState({
      selectedPathway
    });
  }
  unselectPathway(){
    this.setState({
      selectedPathway: null
    });
  }

  // RENDERING
  chips(){
    const [tag, prompt] = this.state.selectedPostProbs!==null ?
      [
        <i className="material-icons" onClick={()=>{this.unselectPostProbs}}>
          chevron_left
        </i>,
        this.state.selectedPostProbs.id
      ]:[
        undefined, "Select a posterior probability set"
      ];
    return (
      <div className="chip" style={{width:"100%"}}>
        {tag}
        {prompt}
      </div>
    );
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div>
        <div className="section" style={noPad}>
          <div className="row">
            <div className="col s12 center-align">
              <div className="chip grey lighten-5">Inspect Posterior Probabilities</div>
            </div>
            {this.chips()}
          </div>
          {
            this.state.selectedPostProbs!==null ?
            <div className="row">
              Pathways
            </div>
            :
            <div className="row">
              <PosteriorProbabilitiesControl
                  selectPostProbs={this.selectPostProbs}
                  posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                  setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
            </div>
          }
        </div>
      </div>
    );
  }
}
