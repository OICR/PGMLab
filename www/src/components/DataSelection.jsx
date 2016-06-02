import React from 'react'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectObservationSet} from './SelectObservationSet.jsx'

export class DataSelection extends React.Component {
  componentDidMount() {
    $(".tooltipped").tooltip({delay: 25});
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <h5>Data Selection</h5>
        <div className="row">
          <div className="col s6 center-align">
            <SelectObservationSet observationMap = {this.props.observationMap}
                                  selectObservationSet   = {this.props.selectObservationSet}
                                  selectObservations = {this.props.selectObservations}
                                  removeSelectedObservations = {this.props.removeSelectedObservations} />
          </div>
          <div className="col s6 center-align">
            <SelectPathways pathwayMap = {this.props.pathwayMap}
                            selectPathways={this.props.selectPathways}
                            removeSelectedPathways={this.props.removeSelectedPathways} />
          </div>
        </div>
      </div>
    );
  }
}
