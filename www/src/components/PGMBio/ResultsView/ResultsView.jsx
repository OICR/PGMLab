import React from "react"
import HeatmapController from "./HeatmapController.jsx"
import HeatmapPanel from "./HeatmapPanel.jsx"

export default class ResultsView extends React.Component {
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div classname="col s11">
          <HeatmapController />
          <HeatmapPanel />
        </div>
      </div>
    )
  }
}
