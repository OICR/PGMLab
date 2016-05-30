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
    if (this.props.selectedObservations.get("Active") !== newActiveIndex) {
      this.props.setActiveObservation(newActiveIndex);
    };
  }

  // RENDERING
  header(){
    const selectedObservations = this.props.selectedObservations;
    const observationIndices = selectedObservations.get("Indices");
    const activeObservationIndex = selectedObservations.get("Active");
    const observationItems = observationIndices.map(i => {
      return (
        <MenuItem key={i} value={i}  primaryText={`Observation ${i}`} />
      );
    })
    return (
      <SelectField  value={activeObservationIndex}
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
                  selectedObservationSet={this.props.selectedObservationSet}
                  selectedObservations={this.props.selectedObservations}
                  pairwiseInteractions={this.props.pairwiseInteractions}
                  setNodeItemState={this.props.setNodeItemState}/>
      </div>
    );
  }
}
