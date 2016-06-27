
import React from 'react'

import {JobSubmitForm} from "./JobSubmitForm.jsx"
import {JobResultTable} from "./JobResultTable.jsx"

export class Body extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
      const fullSize = {height:"1000px"}
      return (
        <main className="row grey lighten-4" style={fullSize}>
            <JobSubmitForm />
            <JobResultTable session={this.props.session}/>
        </main>
      )
    }
}
