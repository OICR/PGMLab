import React from "react"

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {RunTypePanel} from "./RunTypePanel.jsx";
import {ControlPanel} from "./ControlPanel.jsx";
import {InferenceResults} from "./InferenceResults.jsx";
import {GraphPanel} from "./GraphPanel.jsx";
import {HeatMapPanel} from "./HeatMapPanel.jsx";

var graphvis = require("./../bin/graphvis.js");
var classNames = require("classnames");

export class Body extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      // console.log("<Body> render()");
      const tab = this.props.tab;
      const LeftPanel = tab==="Run" ?
        <ControlPanel {...this.props} />:<InferenceResults {...this.props} />;
      const noMargin = {marginBottom:"0px",marginTop:"0px"};
      const leftStyle = {minWidth:"300px", paddingTop:"10px"};
      const canvasSize = {minWidth:"800px", minHeight:"650px"};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="row grey lighten-5" style={noMargin}>
          <div className="col s4" style={leftStyle}>
            <RunTypePanel tab={this.props.tab}
                          runType = {this.props.runType}
                          toggleRunType = {this.props.toggleRunType} />
            {LeftPanel}
          </div>
          <div className="col s8">
            <div className={classNames({"hide":tab!=="Run"})} style={canvasSize}>
              <GraphPanel />
            </div>
            <div className={classNames({"hide":tab!=="Results"})}>
              <HeatMapPanel
                posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                inchlibCluster={this.props.inchlibCluster}/>
            </div>
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
