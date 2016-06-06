import React from "react";

import {PosteriorProbabilitiesControl} from "./PosteriorProbabilitiesControl.jsx";

export class ResultsPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      activePosteriorProbability: null,
      activeObservation: null
    }
  }
  componentDidMount(){
    $("ul.tabs").tabs()
  }

  // RENDERING
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div>
        <div className="section" style={noPad}>
          <h5 className="center-align">Posterior Probabilities</h5>
          <div className="row">
            <div className="col s12">
              <ul className="tabs grey lighten-5">
                <li className="tab col s4"><a href="#ppSets">Sets</a></li>
                <li className="tab col s4"><a href="#ppObs">Observations</a></li>
                <li className="tab col s4"><a href="#ppNodes">Nodes</a></li>
              </ul>
            </div>
          </div>
          <div id="ppSets" className="row">
            <PosteriorProbabilitiesControl
                posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                setActivePosteriorProbability={this.props.setActivePosteriorProbability} />
          </div>
          <div id="ppObs" className="row">
            OBS
          </div>
          <div id="ppNodes" classname="row">
            NODES
          </div>
        </div>
      </div>
    );
  }
}
