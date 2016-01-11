import React from 'react'

import {Filter} from './Filter.jsx'
import {PathwayNames} from './Pathwaynames.jsx'

export class SideNav extends React.Component {
    constructor (props) { 
         super();
         this.state = { 
            filterText: '' 
         };
    };
    stateUpdate(value) {
        this.state = { 
            filterText: value 
        };
    };
    render () {
        var filterText = this.state.filterText;
        return (
            <ul id="nav-mobile" className="side-nav fixed">
                <li>
                    <a id="side-nav-close" href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu small"></i></a>
                </li>
                <li className="logo">
                    <h5>Select Pathway</h5>
                        <Filter filterVal={filterText}
                              filterUpdate={this.stateUpdate} />
                </li>
                <li className="search">
                </li>
                <li id="side-nav-pathway-list">
                    <div className="collection ">
                        <PathwayNames pathways={this.props.pathways} filter={filterText} />
                    </div>
                </li>
            </ul> )
    };
}
