
import React from 'react'

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {JobSubmitForm} from "./JobSubmitForm.jsx"
import {JobResultTable} from "./JobResultTable.jsx"

export class Body extends React.Component {
    constructor(props) {
        super(props)
        this.props.TEST()
    }
    render () {
      const noMargin = {marginTop:"0px",marginBottom:"0px"};
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="grey lighten-4">
          <div className="row" style={noMargin}>
            <JobSubmitForm />
            <JobResultTable session={this.props.session}/>
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
