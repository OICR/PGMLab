import React from 'react'

import {Settings} from './Settings.jsx'

var graph = require('../bin/graph.js');

export class Content extends React.Component {
   componentDidMount () {
        graph.initialize();
        graph.render(this.props.pairwiseInteractions);
   }
   runSearch() {
        graph.searchNode();
   }
   zoomIn() {
        graph.zoomClick(1);
   } 
   zoomOut() {
        graph.zoomClick(-1);
   }
   render () {
        return (
            <div id="section">
                <div id="tabs-component" className="col s18 m5">
                    <Settings pathways={this.props.pathways} activePathway={this.props.activePathway}></Settings>
                </div>

                 <div className="col s18 m8 l8">
                    <div className="col l5">
                       <input id="search"></input>
                       <a className="btn-floating btn waves-effect waves-light orange" onClick={this.runSearch} type="button"><i className="medium material-icons">search</i></a>
                    </div>
                    <div className="col l1 offset-l5">
                        <a className="btn-floating btn waves-effect waves-light orange" onClick={this.zoomIn} type="button"><i className="medium material-icons">zoom_in</i></a>
                    </div>
                    <div className="col l1">
                        <a className="btn-floating btn waves-effect waves-light orange" onClick={this.zoomOut} type="button"><i className="medium material-icons">zoom_out</i></a>
                    </div>

                    <div id="chart"></div>
                 </div>
                 <br></br>
                 <div className="section"></div>
            </div>
        );
    }
}
