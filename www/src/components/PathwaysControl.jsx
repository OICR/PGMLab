import React from 'react';

import {NodeList} from "./NodeList.jsx";
import {NodeItem} from "./NodeItem.jsx";

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);

    this.shiftActivePathway = this.shiftActivePathway.bind(this);
    this.header = this.header.bind(this);
  }

  shiftActivePathway(shift){
    // Sort selectedPathway IDs
    const selectedPathways = this.props.selectedPathways;
    const currentSelected = selectedPathways.get("Pathways");
    const sortedSelectedPathways = this.props.pathways.reduce((sorted, pathway)=>{
      if (currentSelected.includes(pathway.id)) {sorted.push(pathway);};
      return sorted;
    }, []);
    // Find currently active pathway's closest neighbour by index distance
    const direction = (distance)=>{
      switch (shift) {
        case "left": return distance < 0;
        case "right": return distance > 0;
      };
    };
    const currentActivatedIndex = currentSelected.indexOf(selectedPathways.get("Active").id);
    const nextActivated = sortedSelectedPathways.reduce((best,pathway,index)=>{
      const distance = index-currentActivatedIndex;
      const correctDirection = direction(distance);
      const closer = Math.abs(distance) < Math.abs(best.distance);
      switch (correctDirection && closer) {
        case true: return {pathway,distance};
        default: return best;
      };
    }, {pathway:selectedPathways.get("Active"), distance:Infinity});
    // Set new activePathway
    switch (nextActivated.distance === Infinity) {
      case true: return;
      default: this.props.setActivePathway(nextActivated.pathway);
    };
  }

  // RENDERING
  header(){
    const activePathway = this.props.selectedPathways.get("Active");
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActivePathway("left")}}>
          <a><i className="material-icons">chevron_left</i></a>
        </li>
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActivePathway("right")}}>
          <a><i className="material-icons">chevron_right</i></a>
        </li>
        <li><strong>{`${activePathway.name}`}</strong></li>
      </ul>
    );
  }
  render(){
    // console.log(this.props);
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <h5>Active Pathway</h5>
        {this.header()}
        <NodeList activeType="Pathway"
                  selectedObservationSet={this.props.selectedObservationSet}
                  selectedObservations={this.props.selectedObservations}
                  pairwiseInteractions={this.props.pairwiseInteractions}
                  setNodeItemState={this.props.setNodeItemState}/>
      </div>
    );
  }
}
