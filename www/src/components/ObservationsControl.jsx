import React from 'react'

import {NodeList} from "./NodeList.jsx";
import {NodeItem} from "./NodeItem.jsx";
import {SelectField, MenuItem} from "material-ui";

var classNames = require("classnames");

export class ObservationsControl extends React.Component {
  constructor(props){
    super(props);

    this.handleObservationChange = this.handleObservationChange.bind(this);
    this.header = this.header.bind(this);
  }

  handleObservationChange(newActiveIndex){
    if (this.props.observationMap.get("Current").get("Active Observation") !== newActiveIndex) {
      this.props.setActiveObservation(newActiveIndex);
    };
  }

  // RENDERING
  header(){
    let observationMap = this.props.observationMap;
    const activeObservationPosn = observationMap.get("Current").get("Active Observation");
    const selectedObservations = observationMap.get("Current").get("Selected Observations");
    const observationItems = selectedObservations.map(posn =>
      <MenuItem key={posn} value={posn} primaryText={`Observation ${posn}`} />
    );
    return (
      <SelectField  value={activeObservationPosn}
                    onChange={(evt,idx,val)=>{this.handleObservationChange(val)}}
                    fullWidth={true} floatingLabelText={"Active Observation"}
                    children={observationItems} />
    );
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        {this.header()}
        <NodeList activeType="Observation"
                  pairwiseInteractions={this.props.pairwiseInteractions}
                  observationMap = {this.props.observationMap}
                  setNodeItemState={this.props.setNodeItemState}/>
      </div>
    );
  }
}
