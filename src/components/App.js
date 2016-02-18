'use strict';

import React from 'react';
import { render } from 'react-dom';

var observations_learning = [{id:"ol1", name:'one'},{id:"ol2", name:'two'},{id:"ol3", name:'three'}];
var observations_inference = [{id:"oi1", name:'one'},{id:"oi2", name:'two'},{id:"oi3", name:'three'}];

import {Header} from './Header.jsx';
import {Main} from './Main.jsx';
import {Footer} from './Footer.jsx';

// Data
var pi       = require('../data/HDRdec17pi.js');

class App extends  React.Component {
    constructor (props) {
        super(props);
        this.state = ({ activePathway: this.props.activePathway,
                        activeFG:      this.props.activeFG});

        this.setActivePathway = this.setActivePathway.bind(this);
    }
    setActivePathway(pathway) {
        this.setState({activePathway: pathway});
        console.log("setting active pathway");
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
                <Header pathways={this.props.pathways}
                        activePathway={this.state.activePathway}
                        setActivePathway={this.setActivePathway} />
                <Main pathways={this.props.pathways}  
                      activePathway={this.state.activePathway}
                      setActivePathway={this.props.setActivePathway}
                      pairwiseInteractions={pi} />
               <Footer />
            </div> )
    }

}

function init(pathways, activePathway) {
    render(<App pathways={pathways} 
                activePathway={activePathway} />, document.getElementById('app'));
}

exports.init = init;
