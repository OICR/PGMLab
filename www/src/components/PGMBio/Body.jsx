import React from "react"

import RunView from "./RunView/RunView.jsx"
import ResultsView from "./ResultsView/ResultsView.jsx"
import {grey200} from "material-ui/styles/colors"

export default class Body extends React.Component {
  render(){
    return (
      <main style={{backgroundColor:grey200}}>
        <div style={this.props.view!="Run"?{display:"none"}:{}}>
          <RunView
              runType={this.props.runType}
              changeRunType = {this.props.changeRunType}
              dataspace={this.props.dataspace}
              dataspaceModals = {this.props.dataspaceModals}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}
              updatePathwaysModalFilters = {this.props.updatePathwaysModalFilters}
              observations={this.props.observations}
              selectObservationSet={this.props.selectObservationSet}
              selectObservation={this.props.selectObservation}
              pathways={this.props.pathways}
              selectPathway={this.props.selectPathway}
              getReactomePathway = {this.props.getReactomePathway}

              graphVis = {this.props.graphVis}
              graphVisSelectPathway = {this.props.graphVisSelectPathway}
              graphVisSelectObservation = {this.props.graphVisSelectObservation}

              onInferenceSuccess = {this.props.onInferenceSuccess}
          />
        </div>
        <div style={this.props.view!="Results"?{display:"none"}:{}}>
          <ResultsView
              resultIDs={this.props.results.map(r => r.get("runID"))}
              heatmap={this.props.heatmap}
              heatmapSelectResult = {this.props.heatmapSelectResult}
              heatmapSelectPathway = {this.props.heatmapSelectPathway}
              heatmapSelectState = {this.props.heatmapSelectState}
          />
        </div>
      </main>
    )
  }
}
