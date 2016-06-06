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

    this.nodeItem=this.nodeItem.bind(this);
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
  nodeItem(node, nodeState, shared){
    return <NodeItem  key={node.name} node={node}
                      nodeState={nodeState} shared={shared}
                      setNodeItemState={this.props.setNodeItemState}
                      handleNodeFocus={this.handleNodeFocus} handleUnfocusAll={this.handleUnfocusAll} />
  }
  observationsList(){
    let observationMap = this.props.observationMap;
    const observationSet = observationMap.get("Current").get("Set");
    const activeObservationPosn = observationMap.get("Current").get("Active Observation");
    // On init it will be null, otherwise check if activeObservtion has any nodes
    if (activeObservationPosn === null || observationSet.observations[activeObservationPosn].length === 0) {
      // No nodes to list
      return (
        <div className="collection-item center-align" style={{"paddingBottom":"0px", "paddingTop":"0px"}}>
          <span>No Observed States</span>
        </div>
      );
    }
    else {
      // Construct pathwaysMap to check which nodes in observationNodes exist in pathwayNodes
      const pathwayNodes = this.props.pairwiseInteractions.nodes; //may need to add ternary
      const pathwayMap = new Map(pathwayNodes.map(node => [node.name, undefined]));
      const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;
      // Get observation nodes to list
      const observationNodes = observationMap.get("Current").get("Set").observations[activeObservationPosn];
      return observationNodes.map(node => {
        let [nodeState, shared] = [node.state, pathwayMap.has(node.name)];
        return node.name.toLowerCase().indexOf(textInput) ? undefined : this.nodeItem(node,nodeState,shared);
      });
    }
  }
  pathwaysList(){
    const pathwayNodes = this.props.pairwiseInteractions.nodes;
    if (pathwayNodes.length === 0) {
      // No nodes to list
      return (
        <div className="collection-item center-align" style={{"paddingBottom":"0px", "paddingTop":"0px"}}>
          <span>This Pathway Has No Nodes</span>
        </div>
      );
    } else {
      // Construct observationStateMap to check which nodes in pathwayNodes have observed states
      const observationNodes = this.props.observationMap.get("Current").get("Set").observations[this.props.observationMap.get("Current").get("Active Observation")];
      const observationStateMap = new Map(observationNodes.map(node => [node.name, node.state]));
      const textInput = isNaN(this.state.nodeFilterText) ? this.state.nodeFilterText.toLowerCase() : this.state.nodeFilterText;

      return pathwayNodes.map(node => {
        const [nodeState, shared] = observationStateMap.has(node.name) ? [observationStateMap.get(node.name), true] : ["-", false];
        return node.name.toLowerCase().indexOf(textInput) ? undefined : this.nodeItem(node,nodeState,shared);
      });
    };
  }
  render(){
    const scrollable={"maxHeight":"200px","overflow":"scroll"};
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
