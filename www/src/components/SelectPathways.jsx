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
      <div id="selectPathwayModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s4 center-align">
              <a className="btn waves-effect">Show All/Show Selected</a>
            </div>
            <div className="col s4 center-align">
              <a className="btn waves-effect">Uncheck All</a>
            </div>
            <div className="col s4 center-align">
              <a className="btn waves-effect">Check All</a>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <form className="pathway-filter">
                  {/* binding the input value to state */}
                  <input type='text' ref='filterInput' placeholder='Type to filter..'
                    value={filterText} onChange={this.stateUpdate} />
               </form>
             </div>
          </div>
          <div className="row">
            <div className="col s12">
                      <PathwayNames pathways              = {this.props.pathways}
                                    filterText                = {filterText}
                                    selectPathway         = {this.props.selectPathway}
                                    removeSelectedPathway = {this.props.removeSelectedPathway}
                                    selectedPathways      = {this.props.selectedPathways}
                                    activePathway         = {this.props.activePathway}
                                    runType               = {this.props.runType}
                                    setActivePathway      = {this.props.setActivePathway} />
                                  </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close btn-flat">Close</a>

        </div>
      </div>
    )
  }
}
