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
            <SelectObservationSet
              observationSets        = {this.props.observationSets}
              selectObservationSet   = {this.props.selectObservationSet}
              selectedObservationSet = {this.props.selectedObservationSet}
              selectObservations = {this.props.selectObservations}
              removeSelectedObservations = {this.props.removeSelectedObservations}
              selectedObservations = {this.props.selectedObservations} />
          </div>
          <div className="col s6 center-align">
            <SelectPathways
              pathways              = {this.props.pathways}
              selectPathways={this.props.selectPathways}
              removeSelectedPathways={this.props.removeSelectedPathways}
              selectedPathways      = {this.props.selectedPathways} />
          </div>
        </div>
      </div>
    );
  }
}
