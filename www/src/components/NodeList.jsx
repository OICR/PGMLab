import React from "react";

import {NodeItem} from "./NodeItem.jsx";

var graphvis = require("./../bin/graphvis.js");

export class NodeList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      nodeFilterText: "",
      focused: new Set() //will be separate for ActivePathway/Observation, move up one node level (or into root)?
    };

    this.nodeFilterTextUpdate=this.nodeFilterTextUpdate.bind(this);
    this.handleNodeFocus = this.handleNodeFocus.bind(this);
    this.handleUnfocusAll = this.handleUnfocusAll.bind(this);
    this.observationsList=this.observationsList.bind(this);
    this.pathwaysList=this.pathwaysList.bind(this);

  }
  nodeFilterTextUpdate(){
    this.setState({"nodeFilterText": this.refs["nodeFilterInput"].value});
  }
  handleSetState(name,state){
    this.props.setNodeItemState(name,state);
  }

  handleNodeFocus(node){
    const nodeID = node.name;
    let focused = this.state.focused;
    focused.has(nodeID) ? focused.delete(nodeID) : focused.add(nodeID);
    this.setState({focused}, ()=>{graphvis.focusNodes([...focused])});
  }
  handleUnfocusAll(){
    let focused = this.state.focused;
    focused.clear();
    this.setState({focused}, ()=>{graphvis.unfocusAll()});
  }

  // RENDERING
  observationsList(){
    // Construct pathwaysMap to check which nodes in observationNodes exist in pathwayNodes
    const pathwayNodes = this.props.pairwiseInteractions.nodes; //may need to add ternary
    const pathwayMap = new Map(pathwayNodes.map(node => [node.name, undefined]));
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const currentActivatedIndex = this.props.selectedObservations.get("Active");
    const observationNodes = this.props.selectedObservationSet.observations[currentActivatedIndex];
    // console.log("observationNodes:", observationNodes);
    return observationNodes.map(node => {
      let nodeItem;
      if (node.name.toLowerCase().indexOf(textInput)) {
        nodeItem = undefined;
      }
      else {
        nodeItem = <NodeItem  key={node.name} node={node}
                              nodeState={node.state} shared={pathwayMap.has(node.name)}
                              setNodeItemState={this.props.setNodeItemState}
                              handleNodeFocus={this.handleNodeFocus} handleUnfocusAll={this.handleUnfocusAll}/>
      };
      return nodeItem;
    });
  }
  pathwaysList(){
    // Construct observationStateMap to check which nodes in pathwayNodes have observed states
    const observationNodes = this.props.selectedObservationSet.observations[this.props.selectedObservations.get("Active")];
    const observationStateMap = new Map(observationNodes.map(node => [node.name, node.state]));
    const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
    const pathwayNodes = this.props.pairwiseInteractions.nodes ? this.props.pairwiseInteractions.nodes : [];
    // console.log("pathwayNodes:", pathwayNodes);
    return pathwayNodes.map((node)=>{
      let nodeItem;
      if (node.name.toLowerCase().indexOf(textInput)) {
        nodeItem = undefined;
      }
      else {
        const [nodeState, shared] = observationStateMap.has(node.name) ? [observationStateMap.get(node.name), true] : ["-", false];
        nodeItem = <NodeItem  key={node.name} node={node} nodeState={nodeState}
                              shared={shared} setNodeItemState={this.props.setNodeItemState}
                              handleNodeFocus={this.handleNodeFocus} handleUnfocusAll={this.handleUnfocusAll}/>
      }
      return nodeItem;
    });
  }
  render(){
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
