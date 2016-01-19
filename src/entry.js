'use strict';

//require('hammerjs');
//window.jquery = window.jQuery = window.$ = require('./lib/jquery.js');

require('./lib/materialize.min.js');

import React from 'react';
import { render } from 'react-dom';

var observations_learning = [{id:"ol1", name:'one'},{id:"ol2", name:'two'},{id:"ol3", name:'three'}];
var observations_inference = [{id:"oi1", name:'one'},{id:"oi2", name:'two'},{id:"oi3", name:'three'}];

import {Header} from './components/Header.jsx';
import {Main} from './components/Main.jsx';
import {Footer} from './components/Footer.jsx';

// Data
var pi       = require('./data/HDRdec17pi.js');
var pp       = require('./data/HDRdec17pp.js');
var pathways = require('./data/pathways.js');

var AutobahnReact = require('autobahn-react');
AutobahnReact.connect('ws://127.0.0.1:8000/ws', 'realm1');


/*
var isValid = require('utf-8-validate').isValidUTF8;
//var when      = require('when'); 
var WebSocket = require('ws');
var autobahn  = require('autobahn');

/*var connection = new autobahn.Connection({
   url: "ws://127.0.0.1:5000/ws",
   realm: "realm1"
});
*/

class App extends  React.Component {
    constructor () {
        super();
        this.state = ({activePathway: pathways.tree[0]});
        this.setActivePathway = this.setActivePathway.bind(this);
    }
    setActivePathway(pathway) {
        this.setState({activePathway: pathway});
        console.log("settingstate globally");
    }
    componentDidMount () {
      $('#side-nav-open').click(() => {
          $('.side-nav').toggleClass('open')
      });
      $('#side-nav-close').click(() => {
          $('.side-nav').toggleClass('open')
      });
    }
    render () {
        return (
            <div>
                <Header pathways={pathways}
                        activePathway={this.state.activePathway}
                        setActivePathway={this.setActivePathway} />
                <Main pathways={pathways}  
                      activePathway={this.state.activePathway}
                      setActivePathway={this.props.setActivePathway}
                      pairwiseInteractions={pi} />
                <Footer />
            </div> )
    }
}
render(<App />, document.getElementById('app'));
