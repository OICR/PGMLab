import React from 'react'
var moment = require('moment')

import {Header} from './Header.jsx'
import {Body}   from './BodyPGMLab.jsx'
import {Footer} from './Footer.jsx'

export class App extends  React.Component {
  static getCurrentDateTime() {return moment().format('MMM D, YYYY HH:mm')}
  constructor (props) {
    // console.log("app constructor", props.session);
    super(props)
  }
  componentWillMount(){

    // this.props.session.call("publish.tasks")
  }
  render () {

    return (
      <div>
        <Header />
        <Body session={this.props.session}/>
        <Footer />
      </div>
    );
  }
}
