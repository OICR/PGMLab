import React from 'react'

import {NodeItem} from "./NodeItem.jsx";

var classNames = require("classnames");

export class ObservationsControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeFilterText: ""
    };

    this.nodeFilterTextUpdate = this.nodeFilterTextUpdate.bind(this);
    this.shiftActiveObservation = this.shiftActiveObservation.bind(this);
    this.header = this.header.bind(this);
    this.nodeList = this.nodeList.bind(this);
  }
  nodeFilterTextUpdate(){
    this.setState({nodeFilterText: this.refs["nodeFilterInput"].value})
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
    const selectedObservationSet = this.props.selectedObservationSet;
    const currentActivatedIndex = this.props.selectedObservations.get("Active");
    const activeObservation = selectedObservationSet.observations[currentActivatedIndex];
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActiveObservation("left")}}>
          <a><i className="material-icons">chevron_left</i></a>
        </li>
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActiveObservation("right")}}>
          <a><i className="material-icons">chevron_right</i></a>
        </li>
        <li><strong>{"Observation ".concat(currentActivatedIndex.toString())}</strong></li>
      </ul>
    );
  }
  nodeList(){
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const selectedObservationSet = this.props.selectedObservationSet;
    const currentActivatedIndex = this.props.selectedObservations.get("Active");
    const activeObservation = selectedObservationSet.observations[currentActivatedIndex];// ? selectedObservationSet.observations[currentActivatedIndex] : [];
    console.log("observationNodes", activeObservation);
    const nodes = activeObservation.map((node)=>{
      const textFilter = node.name.toLowerCase().indexOf(textInput);
      // activeType for updating either the same node in observation or pathway
      return (
        (textFilter) ? undefined : <NodeItem key={node.name} node={node} activeType="Observation" setNodeItemState={this.props.setNodeItemState}/>
      );
    });
    return nodes;
  }
  render(){
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <h5>Active Observation</h5>
        {this.header()}
        <div className="collection" style={{"maxHeight":"275px","overflow":"scroll"}}>
          <div className="collection-item" style={noPad}>
            <input type="text" ref="nodeFilterInput" placeholder="Type to filter nodes"
              value={this.state.nodeFilterText} onChange={this.nodeFilterTextUpdate}/>
          </div>
          {this.nodeList()}
        </div>
      </div>
    );
  }
}
