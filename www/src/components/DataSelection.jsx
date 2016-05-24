import React from 'react'
import {SelectPathways} from './SelectPathways.jsx'
import {SelectObservationSet} from './SelectObservationSet.jsx'

export class DataSelection extends React.Component {
  render() {
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

            <a className="btn modal-trigger tooltipped" href="#selectObservationSetModal" data-position="top" data-tooltip="Observation Sets">
                Observations
            </a>
          </div>
          <div className="col s6 center-align">
            <SelectPathways
              pathways              = {this.props.pathways}
              selectPathways={this.props.selectPathways}
              removeSelectedPathways={this.props.removeSelectedPathways}
              selectedPathways      = {this.props.selectedPathways} />
            <a className="btn modal-trigger tooltipped" href="#selectPathwayModal" data-position="top" data-tooltip="Pathways">
                Pathways
            </a>
          </div>
        </div>
      </div>
    );
  }
}
