import React from "react"

import HeatmapController from "./HeatmapController.jsx"
import HeatmapPanel from "./HeatmapPanel.jsx"

export default class ResultsView extends React.Component {
  render(){
    return (
      <div className="row card-panel" style={{marginBottom:"0px"}}>
        <div className="col s12">
          <HeatmapController
              resultIDs = {this.props.resultIDs}
              heatmap = {this.props.heatmap}
              heatmapSelectResult = {this.props.heatmapSelectResult}
              heatmapSelectPathway = {this.props.heatmapSelectPathway}
              heatmapSelectState = {this.props.heatmapSelectState}
          />
        </div>
        <div className="col s12 center-align">
          <HeatmapPanel
              heatmap = {this.props.heatmap}/>
        </div>
      </div>
    )
  }
}
