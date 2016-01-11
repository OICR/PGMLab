import React from 'react'

import {PathwayNames} from './Pathwaynames.jsx'

export class SideNav extends React.Component {
    constructor (props) { 
         super();
         this.state = { 
            filterText: '' 
         };
	this.stateUpdate = this.stateUpdate.bind(this);
    };
    stateUpdate(event) {
        console.log("event", event.target.value);
        this.setState({ 
            filterText: event.target.value 
        });
        console.log(this.state);
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
                    <ul><li>
                    <form className="pathway-filter">
                        <input
                         type='text'
                         ref='filterInput'
                         placeholder='Type to filter..'
                         // binding the input value to state 
                         value={filterText}
                         onChange={this.stateUpdate} />
                     </form>
                   </li></ul>
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
