
import React from 'react'

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {JobSubmitForm} from "./JobSubmitForm.jsx"
import {JobResultTable} from "./JobResultTable.jsx"

export class Body extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="row grey lighten-4">
            <JobSubmitForm />
            <JobResultTable session={this.props.session}/>
        </main>
        </MuiThemeProvider>
      )
    }
}
