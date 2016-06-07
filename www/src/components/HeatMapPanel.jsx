import React from "react";

import InChlib from "biojs-vis-inchlib";
// import example from "json!./example.json";

export class HeatMapPanel extends React.Component {
  constructor(props){
    super(props);
    // console.log(InChlib);
  }
  componentDidMount(){
    var heatmap = new InChlib({
      target: "heatmapContainer",
      metadata: false,
      column_metadata: false,
      max_height: 1200,
      width: 800,
      meatmap_colors: "Greens",
      metadata_colors: "Reds"
    });
    // console.log(example);
    // heatmap.read_data(test);
    // heatmap.draw();
  }
  render(){
    return (
      <div>
        <div id="heatmapContainer"></div>
      </div>
    );
  }
}
