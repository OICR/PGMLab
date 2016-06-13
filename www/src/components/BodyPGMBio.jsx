import React from "react"

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


import {RunControlPanel} from "./RunControlPanel.jsx";
import {ResultsControlPanel} from "./ResultsControlPanel.jsx";
import {GraphPanel} from "./GraphPanel.jsx";
import {HeatMapPanel} from "./HeatMapPanel.jsx";

var graphvis = require("./../bin/graphvis.js");
var classNames = require("classnames");

export class Body extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      const tab = this.props.tab;
      const noMargin = {marginBottom:"0px",marginTop:"0px"};
      const leftStyle = {minWidth:"300px", paddingTop:"10px"};
      const canvasSize = {minWidth:"800px", minHeight:"650px"};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          {(()=>{
            switch (tab) {
              case "Run":
                return (
                  <main className="row grey lighten-5" style={noMargin}>
                    <div className="col s4" style={leftStyle}>
                      <RunControlPanel {...this.props} />
                    </div>
                    <div className="col s8" style={canvasSize}>
                      <GraphPanel />
                    </div>
                  </main>
                );
              case "Results":
                return (
                  <main className="row grey lighten-5" style={noMargin}>
                    <div className="col s12">
                      <ResultsControlPanel {...this.props} />
                    </div>
                    <div className="col s12">
                      <HeatMapPanel
                        posteriorProbabilitiesMap={this.props.posteriorProbabilitiesMap}
                        inchlibCluster={this.props.inchlibCluster} />
                    </div>
                  </main>
                );
          }})()}
        </MuiThemeProvider>
      )
    }
}
