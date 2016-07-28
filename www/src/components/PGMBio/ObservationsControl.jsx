import React from 'react'

import NodeList from "./NodeList.jsx";
import NodeItem from "./NodeItem.jsx";

import {SelectField, MenuItem} from "material-ui";

var classNames = require("classnames");

export default class ObservationsControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeFilterText: ""
    }
    this.handleObservationChange = this.handleObservationChange.bind(this);
  }
  handleObservationChange(newActiveIndex){
    if (this.props.observationMap.get("Current").get("Active Observation") !== newActiveIndex) {
      this.props.setActiveObservation(newActiveIndex);
    };
  }

  // RENDERING
  render(){
    let observationMap = this.props.observationMap;
    const activeObservationPosn = observationMap.get("Current").get("Active Observation");
    const selectedObservations = observationMap.get("Current").get("Selected Observations");
    const observationItems = [...selectedObservations.values()].map(posn =>
      <MenuItem key={posn} value={posn} primaryText={`Observation ${posn}`} />
    );
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div id="ObservationsControl" className="section" style={noPad}>
        <div className="card-panel">
          <div className="center-align">
            <div className="chip grey lighten-5">Inspect an observation and its node states</div>
            <SelectField  value={activeObservationPosn}
                          onChange={(evt,idx,val)=>{this.handleObservationChange(val)}}
                          autoWidth={true}
                          style={{width:"100%"}}
                          children={observationItems} />
            <div className="collection-item" style={noPad}>
              <input type="text" ref="nodeFilterInput" placeholder="Type to filter nodes"
                value={this.state.nodeFilterText} onChange={evt=>{this.setState({nodeFilterText:evt.target.value})}} />
            </div>
          </div>
          <NodeList activeType="Observation"
                    pairwiseInteractions={this.props.pairwiseInteractions}
                    observationMap = {this.props.observationMap}
                    setNodeItemState={this.props.setNodeItemState}
                    nodeFilterText={this.state.nodeFilterText}/>
        </div>
      </div>
    );
  }
}
