//require('hammerjs');
//window.jquery = window.jQuery = window.$ = require('./lib/jquery.js');

//import style from 'style';
//require('imports?define=>false!blueimp-file-upload')

//import resumable from 'resumable';
//import autobahn from 'autobahn';

//import navigator from 'navigator';

//import html5shiv from 'html5shiv';

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
