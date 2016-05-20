import React from 'react';

import {NodeItem} from "./NodeItem.jsx";

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nodeFilterText: ""
    };

    this.nodeFilterTextUpdate = this.nodeFilterTextUpdate.bind(this);
    this.header = this.header.bind(this);
    this.nodeList = this.nodeList.bind(this);
  }

  nodeFilterTextUpdate(){
    this.setState({nodeFilterText: this.refs["nodeFilterInput"].value});
  };

  // RENDERING
  header(){
    const selectedPathways = this.props.selectedPathways;
    const activePathwayID = selectedPathways.get(this.props.runType).get("Active");
    const activePathway = this.props.pathways.find((pathway)=>{
      return pathway.id === activePathwayID;
    });
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5"><a><i className="material-icons">chevron_left</i></a></li>
        <li className="waves-effect blue lighten-5"><a><i className="material-icons">chevron_right</i></a></li>
        <li><a><i className="material-icons">search</i></a></li>
        <li><strong>{activePathway.name}</strong></li>
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
    return (
      <div className="section">
        <h5>Active Pathway</h5>
        {this.header()}
        <div className="collection" style={{"height":"200px","overflow":"scroll"}}>
          <div className="collection-item">
            <input type="text" ref="nodeFilterInput" placeholder="Type to filter nodes"
              value={this.state.nodeFilterText} onChange={this.nodeFilterTextUpdate}/>
          </div>
          {this.nodeList()}
        </div>
      </div>
    );
  }
}
