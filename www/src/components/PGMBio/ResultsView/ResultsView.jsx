import React from "react"
import HeatmapController from "./HeatmapController.jsx"
import HeatmapPanel from "./HeatmapPanel.jsx"

export default class ResultsView extends React.Component {
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div classname="col s11">
          <HeatmapController
              resultIDs={this.props.resultIDs}
              heatmap={this.props.heatmap}
              heatmapSelectResult = {this.props.heatmapSelectResult}
              heatmapSelectPathway = {this.props.heatmapSelectPathway}
              heatmapSelectState = {this.props.heatmapSelectState}
          />
          <HeatmapPanel
              heatmap={this.props.heatmap}/>
        </div>
      </div>
    )
  }
}
