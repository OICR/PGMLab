import React from 'react'

import {PathwayNames} from './PathwayNames.jsx'

export class SelectPathways extends React.Component {
  constructor (props) {
    super();
    this.state = {
      filterText: '',
      filterChecked: false
    }
    this.filterTextUpdate = this.filterTextUpdate.bind(this);
    this.filterCheckedUpdate = this.filterCheckedUpdate.bind(this);
  }
  filterTextUpdate(event) {
      this.setState({
          filterText: event.target.value
      })
  }
  filterCheckedUpdate(event){
    this.setState({
      filterChecked: !this.state.filterChecked
    });
  }
  componentDidupdate() {
      $('.collapsibleLearning').collapsible({accordion : true})
  }
  render () {
    // var filterText = this.state.filterText
    // const checkedText = this.state.filterChecked ? "Show Unselected" : "Hide Unselected";
    // console.log(checkedText);
    return (
      <div id="selectPathwayModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s6 btn waves-effect center-align" onClick={this.filterCheckedUpdate}>
                {this.state.filterChecked ? "Show Unselected" : "Hide Unselected"}
            </div>
            <div className="col s3 center-align btn waves-effect">
              Uncheck All
            </div>
            <div className="col s3 center-align btn waves-effect">
              Check All
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <form className="pathway-filter">
                  {/* binding the input value to state */}
                  <input type='text' ref='filterInput' placeholder='Type to filter..'
                    value={this.state.filterText} onChange={this.filterTextUpdate} />
               </form>
             </div>
          </div>
          <div className="row">
            <div className="col s12">
                      <PathwayNames pathways              = {this.props.pathways}
                                    filterText                = {this.state.filterText}
                                    filterChecked = {this.state.filterChecked}
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
