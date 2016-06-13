import React from "react";

import InChlib from "biojs-vis-inchlib";

import {SelectField, MenuItem} from "material-ui";


export class HeatMapPanel extends React.Component {
  constructor(props){
    super(props);
    this.inchlib = new InChlib({
      target: "heatmapContainer",
      metadata: false,//true,
      column_metadata: false,//true,
      max_height: 1200,
      width: 800,
      meatmap_colors: "Greens",
      metadata_colors: "Reds"
    });

    this.state = {
      selectedPathway: null,
      selectedState: "stateD",
    };

    this.header = this.header.bind(this);
    this.selectPathway = this.selectPathway.bind(this);
    this.selectState = this.selectState.bind(this);
    this.heatmap = this.heatmap.bind(this);
  }

  selectPathway(selectedPathway){
    this.setState({
      selectedPathway
    });
  }
  selectState(selectedState){
    this.setState({
      selectedState
    });
  }

  componentWillReceiveProps(nextProps){
    const postProbsMap = this.props.posteriorProbabilitiesMap;
    const activePostProb = postProbsMap.get("Active");
    const nextPostProbsMap = nextProps.posteriorProbabilitiesMap;
    const nextActivePostProb = nextPostProbsMap.get("Active");
    console.log(activePostProb, nextActivePostProb);
    if (activePostProb===null && nextActivePostProb!==null) {
      // New active post prob
      console.log("new active post prob");
    };
  }
  // RENDERING
  header(){
    const postProbsMap = this.props.posteriorProbabilitiesMap;
    const activePostProb = postProbsMap.get("Active");
    const pathwayChildren = activePostProb===null ?
      []:
      Object.keys(activePostProb.pathwaySet)
        .map(k => activePostProb.pathwaySet[k])
        .map(pathway => <MenuItem key={pathway.id}
                                  value={pathway}
                                  primaryText={pathway.name}/>);
    const stateChildren = ["state1", "state2", "state3", "stateD"]
      .map(s => <MenuItem key={s} value={s} primaryText={s} />);
    const [pathwaySelect, stateSelect] = activePostProb===null ?
      [undefined,undefined]:
      [ <SelectField  value={this.state.selectedPathway}
                      onChange={(evt,idx,val)=>{this.selectPathway(val)}}
                      autoWidth={true}
                      children={activePostProb===null ? []:pathwayChildren} />,
        <SelectField  value={this.state.selectedState}
                      onChange={(evt,idx,val)=>{this.selectState(val)}}
                      autoWidth={true}
                      children={activePostProb===null ? []:stateChildren} />
      ];
    return (
      <div className="row">
        <div className="col s8">{pathwaySelect}</div>
        <div className="col s4">{stateSelect}</div>
      </div>
    );
  }
  heatmap(){
  //   // Set inchlibJSON data, put draw into callback on setState
  //   this.props.inchlibCluster()
  //     .then(
  //       inchlibJSON => {
  //         // console.log(inchlibJSON)
  //         this.setState({
  //           inchlibJSON
  //         }, ()=>{
  //           this.inchlib.read_data(inchlibJSON["state3"]);
  //           this.inchlib.draw();
  //         })
  //       },
  //       err => console.log("Error inchlibCluster", err)
  //     );
  }
  render(){
    return (
      <div className="card-panel">
        { this.header() }
        <div className="divider"></div>
        <div id="heatmapContainer"></div>
      </div>
    );
  }
}
