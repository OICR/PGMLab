import React from 'react';

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {JobSubmitPanel} from "./JobSubmitPanel.jsx";
import {JobResultsPanel} from "./JobResultsPanel.jsx";

export class Body extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      const noMargin = {marginTop:"0px",marginBottom:"0px"};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="grey lighten-4">
          <div className="row" style={noMargin}>
            <JobSubmitPanel/>
            <JobResultsPanel {...this.props}/>
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
