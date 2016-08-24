import React from "react"
import InChlib from "biojs-vis-inchlib"

export default class HeatmapPanel extends React.Component {
  constructor(props){
    super(props)
    this.inchlib = new InChlib({
      target: "heatmapCanvas",
      metadata: false,
      column_metadata: false,
      max_height: 1200,
      width: 800,
      heatmap_colors: "Greens",
      metadata_colors: "Reds"
    })
  }
  render(){
    return (
      <div>
        <div id="heatmapCanvas"></div>
      </div>
    )
  }
}
