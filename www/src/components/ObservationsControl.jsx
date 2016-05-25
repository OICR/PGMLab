import React from 'react'

import {NodeList} from "./NodeList.jsx";
import {NodeItem} from "./NodeItem.jsx";

var classNames = require("classnames");

export class ObservationsControl extends React.Component {
  constructor(props){
    super(props);

    this.shiftActiveObservation = this.shiftActiveObservation.bind(this);
    this.header = this.header.bind(this);
  }
  shiftActiveObservation(shift){
    // Find currently active observation's closest neighbour in selectedObservations by comparing index distances
    const direction = (distance)=>{
      switch (shift) {
        case "left": return distance < 0;
        case "right": return distance > 0;
      };
    };
    const selectedObservations = this.props.selectedObservations;
    const currentActivatedIndex = selectedObservations.get("Active");
    const nextActivated = selectedObservations.get("Indices").reduce((best,index)=>{
      const distance = index-currentActivatedIndex;
      const correctDirection = direction(distance);
      const closer = Math.abs(distance) < Math.abs(best.distance);
      switch (correctDirection && closer) {
        case true: return {index,distance};
        default: return best;
      };
    }, {index:currentActivatedIndex,distance:Infinity});
    // console.log(nextActivated, selectedObservations.get("Indices"));
    switch (nextActivated.distance === Infinity) {
      case true: return;
      default: this.props.setActiveObservation(nextActivated.index);
    };
  }

  // RENDERING
  header(){
    const currentActivatedIndex = this.props.selectedObservations.get("Active");
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActiveObservation("left")}}>
          <a><i className="material-icons">chevron_left</i></a>
        </li>
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActiveObservation("right")}}>
          <a><i className="material-icons">chevron_right</i></a>
        </li>
        <li><strong>{`Observation: ${currentActivatedIndex}`}</strong></li>
      </ul>
    );
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <h5>Active Observation</h5>
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
