import React from 'react'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectObservationSet} from './SelectObservationSet.jsx'

export class DataSelection extends React.Component {
  componentDidMount() {
    $(".modal-trigger").leanModal();
    $(".tooltipped").tooltip({delay: 25});
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content row center-align" style={{paddingBottom:"0px"}}>
                <div className="col s12 chip">
                  {"Select data to be used by PGMLab"}
                </div>
                <div className="divider"></div>
                <div className="col s6">
                  <SelectObservationSet observationMap = {this.props.observationMap}
                                        updateObservationMap = {this.props.updateObservationMap} />
                </div>
                <div className="col s6">
                  <SelectPathways pathwayMap = {this.props.pathwayMap}
                                  pathwayMap2 = {this.props.pathwayMap2}
                                  updatePathwayMap = {this.props.updatePathwayMap} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
