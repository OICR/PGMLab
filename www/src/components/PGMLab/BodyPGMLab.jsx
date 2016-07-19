import React from 'react';

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import JobSubmitPanel from "./JobSubmitPanel.jsx";
import JobResultsPanel from "./JobResultsPanel.jsx";

export default class Body extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      const noMargin = {marginTop:"0px",marginBottom:"0px"};
      const {snackbarMessage, snackbarNotify, ...resultsProps} = this.props;
      const submitProps = {snackbarMessage, snackbarNotify};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="grey lighten-4">
          <div className="row" style={noMargin}>
            <JobSubmitPanel {...submitProps}/>
            <JobResultsPanel {...resultsProps}/>
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
