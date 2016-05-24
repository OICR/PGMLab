import React from 'react';

import {NodeItem} from "./NodeItem.jsx";

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeFilterText: ""
    };

    this.nodeFilterTextUpdate = this.nodeFilterTextUpdate.bind(this);
    this.shiftActivePathway = this.shiftActivePathway.bind(this);
    this.header = this.header.bind(this);
    this.nodeList = this.nodeList.bind(this);
  }

  nodeFilterTextUpdate(){
    this.setState({nodeFilterText: this.refs["nodeFilterInput"].value});
  };

  shiftActivePathway(shift){
    // Sort selectedPathway IDs
    const selectedPathways = this.props.selectedPathways;
    const currentSelected = selectedPathways.get("Pathways");
    const sortedSelectedPathways = this.props.pathways.reduce((sorted, pathway)=>{
      if (currentSelected.includes(pathway.id)) {sorted.push(pathway.id);};
      return sorted;
    }, []);
    // Find currently active pathway's closest neighbour by index distance
    const direction = (distance)=>{
      switch (shift) {
        case "left": return distance < 0;
        case "right": return distance > 0;
      };
    };
    const currentActivatedIndex = currentSelected.indexOf(selectedPathways.get("Active"));
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
    const selectedPathways = this.props.selectedPathways;
    const activePathwayID = selectedPathways.get("Active");
    const activePathway = this.props.pathways.find((pathway)=>{
      return pathway.id === activePathwayID;
    });
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActivePathway("left")}}>
          <a><i className="material-icons">chevron_left</i></a>
        </li>
        <li className="waves-effect blue lighten-5" onClick={()=>{this.shiftActivePathway("right")}}>
          <a><i className="material-icons">chevron_right</i></a>
        </li>
        <li><strong class="truncate">{activePathway.name}</strong></li>
      </ul>
    );
  }
  nodeList(){
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const pathwayNodes = this.props.pairwiseInteractions.nodes ? this.props.pairwiseInteractions.nodes : [];
    const nodes = pathwayNodes.map((node)=>{
      // Change this to filter different node.properties
      const textFilter = node.name.toLowerCase().indexOf(textInput);
      //Need a way to connect these nodes to the ones displayed in ObservationsPanel
      const nodeProp = {name:node.name,state:"-"};
      return (
        (textFilter) ? undefined : <NodeItem key={node.name} node={nodeProp} />
      );
    });
    return nodes;
  }
  render() {
    console.log(this.props);
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        <h5>Active Pathway</h5>
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
