import React from 'react'

import {PathwayNames} from './PathwayNames.jsx'

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
  componentDidupdate() {
      $('.collapsibleLearning').collapsible({accordion : true})
  }
  render () {
    var filterText = this.state.filterText
    return (
        <ul>
            <li className="logo">
                <ul><li>
                <form className="pathway-filter">
                    {/* binding the input value to state */}
                    <input
                     type='text'
                     ref='filterInput'
                     placeholder='Type to filter..'

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
                                  runType               = {this.props.runType}
                                  setActivePathway      = {this.props.setActivePathway} />
                </table>
            </li>
        </ul>
    )
  }
}
