import React from "react";

import {Dialog, FlatButton, TextField} from "material-ui";

var classNames = require("classnames");

export class SelectPosteriorProbabilities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      postProbsMap: this.props.posteriorProbabilitiesMap,
      selectedPathways: new Map()
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);

    this.handleSetActivePostProbs = this.handleSetActivePostProbs.bind(this);
    this.handleSelectPathway = this.handleSelectPathway.bind(this);
    this.postProbsSetList = this.postProbsSetList.bind(this);
    this.postProbPathwayList = this.postProbPathwayList.bind(this);
  }



  // RENDERING
  postProbsSetList(){
    const emptyPrompt = (
      <div className="collection-item center-align">
        <span>No posterior probability sets to show</span>
      </div>
    );
    const postProbsMap = this.state.postProbsMap;
    const itemClass = (ppID) => classNames(
      {"active":postProbsMap.get("Active")===null ? false : postProbsMap.get("Active").id===ppID},
      ["collection-item grey-text"]
    );
    const postProbsSets = [...postProbsMap.get("All").values()]
      .filter(pp => pp.type === "Run")
      .map(pp => (
        <a  key={pp.id} className={itemClass(pp.id)}
            onClick={()=>{this.handleSetActivePostProbs(pp.id)}}>
          {"ID: "}<span className="black-text">{pp.id}<br/></span>
          {"Observation Set: "}<span className="black-text">{pp.observationSet.name}<br/></span>
          {"Number of Pathways: "}<span className="black-text">{Object.keys(pp).length}<br/></span>
          {"Run submitted: "}<span className="black-text">{pp.dateTime}</span>
        </a>
      ));
    const scrollable={maxHeight:"70%", overflow:"scroll"};
    return (
      <div className="collection" style={scrollable}>
        {postProbsSets.length===0 ? emptyPrompt:postProbsSets}
      </div>
    );
  }
  postProbPathwayList(){
    const emptyPrompt = (
      <div className="collection-item center-align">
        {"No pathways to show"}
      </div>
    );
    const postProbsMap = this.state.postProbsMap;
    const activePostProb = postProbsMap.get("Active");
    const itemClass = pathway => classNames({
      "active": this.state.selectedPathways.has(pathway.id)
    }, "collection-item");
    const postProbPathways = activePostProb===null ?
      emptyPrompt:
      activePostProb.pathwaySet.length===0 ?
        emptyPrompt:
        Object.keys(activePostProb.pathwaySet)
          .map(k => activePostProb.pathwaySet[k])
          .map(pathway => (
            <div  key={pathway.id} className={itemClass(pathway)}
                  onClick={()=>{this.handleSelectPathway(pathway)}}>
              {pathway.name}
            </div>
          ));
    const scrollable={maxHeight:"70%", overflow:"scroll"};
    return (
      <div className="collection" style={scrollable}>
        {postProbPathways}
      </div>
    );
  }
  // MODAL HANDLING
  handleSetActivePostProbs(ppID){
    const postProbsMap = this.state.postProbsMap;
    const activePostProb = postProbsMap.get("All").get(ppID);
    postProbsMap.set("Active", activePostProb);
    const selectedPathways = new Set(Object.keys(activePostProb.pathwaySet));
    this.setState({postProbsMap, selectedPathways});
  }
  handleSelectPathway(pathway){
    const selectedPathways = this.state.selectedPathways;
    selectedPathways.has(pathway.id) ?
      selectedPathways.delete(pathway.id):selectedPathways.add(pathway.id);
    this.setState({selectedPathways});
  }
  handleOpen(){
    this.setState({open:true})
  }
  handleCancel(){
    this.setState({open:false})
  }
  handleGenerate(){
    this.setState({open:false})
  }
  // RENDERING
  render(){

    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCancel} />,
      <FlatButton label="Generate Heat Map" primary={true} onTouchTap={this.handleGenerate} />
    ];
    return (
      <div>
        <FlatButton label="Post Probs" onTouchTap={this.handleOpen}/>
        <Dialog modal={true} open={this.state.open} contentStyle={{overflow:"visible"}}
                actions={actions}>
          <div className="row" style={{height:"500px"}}>
            <div className="col s6 center-align" style={{height:"100%"}}>
              <div>{"Select a posterior probability set"}</div>
              <TextField  hintText="Hint" floatingLabelText="Filter" floatingLabelFixed={true}
                          fullWidth={true} onChange={evt=>{console.log(evt)}}/>
              {this.postProbsSetList()}
            </div>
            <div className="col s6 center-align" style={{height:"100%"}}>
              <div>{"Select heatmap pathways"}</div>
              <TextField  hintText="Pathway names" floatingLabelText={"Filter"} floatingLabelFixed={true}
                          fullWidth={true} onChange={evt=>{console.log(evt.target.value)}} />
              {this.postProbPathwayList()}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
