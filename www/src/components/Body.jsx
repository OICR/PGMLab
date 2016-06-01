import React from 'react'

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {ControlPanel} from './ControlPanel.jsx';
import {DisplayPanel} from './DisplayPanel.jsx';

var graphvis = require('../bin/graphvis.js');
var classNames = require("classnames");

export class Body extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      console.log("<Body> render()");
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="row">
          <div className="col s4" style={{minWidth:"300px"}}>
            <ControlPanel {...this.props}/>
          </div>
          <div className="col s8" style={{minWidth:"800px"}}>
            <DisplayPanel />
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
