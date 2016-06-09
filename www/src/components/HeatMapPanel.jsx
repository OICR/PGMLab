import React from "react";

import InChlib from "biojs-vis-inchlib";
import example from "json!./example.json";

export class HeatMapPanel extends React.Component {
  constructor(props){
    super(props);
    // console.log(InChlib);
    this.heatmapUpdate = this.heatmapUpdate.bind(this);
  }
  //Use lifecycle methods
  componentDidMount(){
  }
  componentWillReceiveProps(props) {//next props
    // Update heatmap here

    this.heatmapUpdate(props.heatmapData);
  }
  heatmapUpdate(data){
    // Pass to server to get JSON input of inchlib
    const inchlibJSON = this.props.inchlibCluster(data);
    // const data = [...this.props.posteriorProbabilitiesMap.get("All").values()][0].posteriorProbabilitiesSet;
    console.log(data);
    // const inchlibJSON = this.props.inchlibCluster(data);
    // Set inchlibJSON data, put draw into callback on setState
    var heatmap = new InChlib({
      target: "heatmapContainer",
      metadata: false,//true,
      column_metadata: false,//true,
      max_height: 1200,
      width: 800,
      meatmap_colors: "Greens",
      metadata_colors: "Reds"
    });
    // console.log(example);
    heatmap.read_data(example);
    heatmap.draw();
  }
  render(){
    return (
      <div className="card-panel">
        <div className="btn" onClick={this.inchlibCluster}>cluster</div>
        <div id="heatmapContainer"></div>
      </div>
    );
  }
}
