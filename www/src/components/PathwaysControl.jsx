import React from 'react';

import {NodeList} from "./NodeList.jsx";
import {NodeItem} from "./NodeItem.jsx";
import {SelectField, MenuItem} from "material-ui";

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);

    this.handlePathwayChange = this.handlePathwayChange.bind(this);
    this.header = this.header.bind(this);
  }

  handlePathwayChange(pathwayID){
    if (this.props.pathwayMap.get("Active").id !== pathwayID) {
      this.props.setActivePathway(this.props.pathwayMap.get("Selected").get(pathwayID));
    }
  }

  // RENDERING
  header(){
    let pathwayMap = this.props.pathwayMap;
    const pathwayItems = [...pathwayMap.get("Selected").values()].map(pathway =>
      <MenuItem key={pathway.id} value={pathway.id}
                primaryText={`${pathway.name}`} label={`${pathway.name}`} />
    );
    return (
      <SelectField  value={pathwayMap.get("Active").id}
                    onChange={(evt,idx,val)=>{this.handlePathwayChange(val)}}
                    fullWidth={true} floatingLabelText={"Active Pathway"}
                    children={pathwayItems} />
    );
  }
  render(){
    // console.log(this.props);
    const noPad={paddingBottom:"0px", paddingTop:"0px"};
    return (
      <div className="section" style={noPad}>
        {this.header()}
        <NodeList activeType="Pathway"
                  observationMap={this.props.observationMap}
                  pairwiseInteractions={this.props.pairwiseInteractions}
                  setNodeItemState={this.props.setNodeItemState}/>
      </div>
    );
  }
}
