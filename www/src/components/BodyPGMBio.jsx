import React from 'react'

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {ControlPanel} from './ControlPanel.jsx';
import {ResultsPanel} from "./ResultsPanel.jsx";
import {DisplayPanel} from './DisplayPanel.jsx';

var graphvis = require('../bin/graphvis.js');

export class Body extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      console.log("<Body> render()");
      let leftPanel;
      switch (this.props.tab) {
        case "Run":
          console.log("Run tab");
          leftPanel = <ControlPanel {...this.props}/>;
          break;
        case "Results":
          console.log("Results");
          leftPanel = <ResultsPanel {...this.props}/>;
          break;
      };
      const canvasSize = {minWidth:"800px", minHeight:"600px"};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="row">
          <div className="col s4" style={{minWidth:"300px"}}>
            {leftPanel}
          </div>
          <div className="col s8" style={canvasSize}>
            <DisplayPanel />
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
