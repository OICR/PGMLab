import React from 'react'
var moment = require('moment')

import {Header} from './Header.jsx'
import {Body}   from './BodyPGMLab.jsx'
import {Footer} from './Footer.jsx'

export class App extends  React.Component {
  static getCurrentDateTime() {return moment().format('MMM D, YYYY HH:mm')}
  constructor (props) {
    console.log("app constructor", props.session, this.state);
    super(props)
  }
  componentWillMount(){
    session.subscribe("celery.tasks", (args, kwargs, details)=>{
      console.log("Event received", args, kwargs, details)
    });
  }
  render () {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}
