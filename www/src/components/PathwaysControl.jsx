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
    if (pathwayID !== this.props.selectedPathways.get("Active").id) {
      const pathway = this.props.pathways.find(p=>p.id===pathwayID);
      this.props.setActivePathway(pathway);
    };
  }

  // RENDERING
  header(){
    const selectedPathways = this.props.selectedPathways;
    const currentSelected = selectedPathways.get("Pathways");
    const allPathways = this.props.pathways;
    const pathwayItems = currentSelected.map((id)=>{
      const found = allPathways.find(p=>p.id === id);
      return <MenuItem  key={found.id} value={found.id}
                        primaryText={`${found.name}`} label={`${found.name}`}/>
    });
    return (
      <SelectField  value={selectedPathways.get("Active").id}
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
                  selectedObservationSet={this.props.selectedObservationSet}
                  selectedObservations={this.props.selectedObservations}
                  pairwiseInteractions={this.props.pairwiseInteractions}
                  setNodeItemState={this.props.setNodeItemState}/>
      </div>
    );
  }
}
