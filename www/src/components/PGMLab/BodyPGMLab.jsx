import React from 'react';

import JobSubmitPanel from "./JobSubmitPanel.jsx";
import JobResultsPanel from "./JobResultsPanel.jsx";

export default class Body extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      const noMargin = {marginTop:"0px",marginBottom:"0px"};
      const {auth, snackbarMessage, snackbarNotify, ...rest} = this.props;
      const submitProps = {auth, snackbarMessage, snackbarNotify};
      const resultsProps = {auth, ...rest};
      return (
        <main className="grey lighten-4">
          <div className="row" style={noMargin}>
            <JobSubmitPanel {...submitProps}/>
            <JobResultsPanel {...resultsProps}/>
          </div>
        </main>
      )
    }
}
