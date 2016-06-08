import React from "react";

import InChlib from "biojs-vis-inchlib";
import example from "json!./example.json";

export class HeatMapPanel extends React.Component {
  constructor(props){
    super(props);
    // console.log(InChlib);
    this.inchlibCluster = this.inchlibCluster.bind(this);
  }
  componentDidMount(){
  }
  inchlibCluster(){
    // console.log(this.props.posteriorProbabilitiesMap);
    const data = [...this.props.posteriorProbabilitiesMap.get("All").values()][0].posteriorProbabilitiesSet;
    // console.log(data);
    const inchlibJSON = this.props.inchlibCluster(data);
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
