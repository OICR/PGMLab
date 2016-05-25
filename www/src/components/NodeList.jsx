import React from "react";

import {NodeItem} from "./NodeItem.jsx";

export class NodeList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      nodeFilterText: ""
    };

    this.nodeFilterTextUpdate=this.nodeFilterTextUpdate.bind(this);
    this.observationsList=this.observationsList.bind(this);
    this.pathwaysList=this.pathwaysList.bind(this);
  }
  nodeFilterTextUpdate(){
    this.setState({"nodeFilterText": this.refs["nodeFilterInput"].value});
  }


  // RENDERING
  observationsList(){
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const currentActivatedIndex = this.props.selectedObservations.get("Active");
    const observationNodes = this.props.selectedObservationSet.observations[currentActivatedIndex];
    console.log("observationNodes:", observationNodes);
    return observationNodes.map((node)=>{
      const textFilter = node.name.toLowerCase().indexOf(textInput);
      return (
        textFilter ? undefined : <NodeItem key={node.name} node={node} />
      );
    });
  }
  pathwaysList(){
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const pathwayNodes = this.props.pairwiseInteractions.nodes ? this.props.pairwiseInteractions.nodes : [];
    console.log("pathwayNodes:", pathwayNodes);
    return pathwayNodes.map((node)=>{
      const textFilter = node.name.toLowerCase().indexOf(textInput);
      return (
        textFilter ? undefined : <NodeItem key={node.name} node={node} />
      );
    });
  }
  render(){
    console.log("NodeList:", this.props);
    const scrollable={"maxHeight":"275px","overflow":"scroll"};
    const noPad={"paddingBottom":"0px","paddingTop":"0px"};
    let nodeList;
    switch (this.props.activeType) {
      case "Observation":
        nodeList = this.observationsList(); break;
      case "Pathway":
        nodeList = this.pathwaysList(); break;
    };
    return (
      <div className="collection" style={scrollable}>
        <div className="collection-item" style={noPad}>
          <input type="text" ref="nodeFilterInput" placeholder="Type to filter nodes"
            value={this.state.nodeFilterText} onChange={this.nodeFilterTextUpdate} />
        </div>
        {nodeList}
      </div>
    );
  }
}
