import React from 'react'

import {PathwayNames} from './Pathwaynames.jsx'

export class SelectPathways extends React.Component {
    constructor (props) { 
        super();
        this.state = { 
            filterText: '',
        }
	this.stateUpdate = this.stateUpdate.bind(this);
    }
    stateUpdate(event) {
        this.setState({ 
            filterText: event.target.value 
        })
    }
    render () {
        var filterText = this.state.filterText
        console.log("SelectPathways", this.props)
        return (
            <ul>
                <li className="logo">
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
                <li id="side-nav-pathway-list" >
                    <table>
                        <PathwayNames pathways              = {this.props.pathways} 
                                      filter                = {filterText}
                                      selectPathway         = {this.props.selectPathway}
                                      removeSelectedPathway = {this.props.removeSelectedPathway}
                                      selectedPathways      = {this.props.selectedPathways}
                                      activePathway         = {this.props.activePathway}
                                      setActivePathway      = {this.props.setActivePathway} />
                    </table>
                </li>
            </ul> )
    }
}
