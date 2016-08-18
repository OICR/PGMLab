
import React from "react"

import RunControlPanel from "./RunControlPanel.jsx";
import ResultsControlPanel from "./ResultsControlPanel.jsx";
import GraphPanel from "./GraphPanel.jsx";
import HeatMapPanel from "./HeatMapPanel.jsx";

var graphvis = require("./../../lib/graphvis.js");
var classNames = require("classnames");

export default class Body extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      const tab = this.props.tab;
      const noMargin = {marginBottom:"0px",marginTop:"0px"};
      const leftStyle = {minWidth:"300px", paddingTop:"10px"};
      const graphSize = {minWidth:"800px", minHeight:"650px"};
      const heatmapSize = {minHeight:"700px"};
      return (
        <main>
          <main className={classNames({"hide":tab!=="Run"},["row grey lighten-5"])} style={noMargin}>
            <div className="col s4" style={leftStyle}>
              <RunControlPanel {...this.props} />
            </div>
            <div className="col s8" style={graphSize}>
              <GraphPanel />
            </div>
          </main>

          <main className={classNames({"hide":tab!=="Results"},["row grey lighten-5"])} style={noMargin}>
            <div className="col s12">
              <ResultsControlPanel {...this.props} />
            </div>
            <div className="col s12" style={heatmapSize}>
              <HeatMapPanel
                posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                inchlibCluster={this.props.inchlibCluster} />
            </div>
          </main>
        </main>
      )
    }
}
