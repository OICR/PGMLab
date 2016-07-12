import React from "react";
import {connect} from "react-redux";
import * as actionCreators from "./redux/action_creators.jsx";

var moment = require('moment');

import {Header} from './Header.jsx';
import {Body}   from './BodyPGMLab.jsx';
import {Footer} from './Footer.jsx';

export class App extends  React.Component {
  static getCurrentDateTime() {return moment().format('MMM D, YYYY HH:mm')}
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Header />
        <Body {...this.props}/>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.get("session")
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
