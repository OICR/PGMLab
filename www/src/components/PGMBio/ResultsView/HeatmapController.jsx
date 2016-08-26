import React from "react"

import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

const getStateLabel = state => {
  switch (state) {
    case "1":
      return "Down-regulated (State 1)"
    case "2":
      return "Non-regulated (State 2)"
    case "3":
      return "Up-regulated (State 3)"
  }
}
const getPathwayLabel = name => name.length > 27 ? name.substr(0,27).concat("...") : name

class PosteriorProbabilitySelect extends React.Component {
  render(){
    return (
      <div className="col s4">
        <SelectField fullWidth={true} autoWidth={true} hintText="Select a result"
            value={this.props.heatmap.get("viewResult")}
            children={
              this.props.resultIDs.valueSeq()
                .map(runID =>
                  <MenuItem key={runID} value={runID} primaryText={runID} autoWidth={false} label={runID}/>
                )
            }
            onChange={(evt,idx,viewResult) => {this.props.heatmapSelectResult(viewResult)}}
        />
      </div>
    )
  }
}

class PathwaySelect extends React.Component {
  render(){
    return (
      <div className="col s4">
        <SelectField fullWidth={true} autoWidth={true} hintText="Select a pathway"
            value={this.props.heatmap.get("viewPathway")}
            children={
              this.props.heatmap.getIn(["data","pathways"])
                .map((name, id) =>
                  <MenuItem key={id} value={id} autoWidth={false}
                      primaryText={name}
                      label={getPathwayLabel(name)}/>
                )
                .valueSeq()
            }
            onChange={(evt,idx,viewPathway) => {this.props.heatmapSelectPathway(viewPathway)}}
        />
      </div>
    )
  }
}

class StateSelect extends React.Component {
  render(){
    return (
      <div className="col s4">
        <SelectField fullWidth={true} autoWidth={true} hintText="Select a state"
            value={this.props.heatmap.get("viewState")}
            children={
              ["1","2","3"]
                .map(state =>
                  <MenuItem key={state} value={state} autoWidth={false}
                      primaryText={getStateLabel(state)}
                      label={getStateLabel(state)}/>
                )
            }
            onChange={(evt,idx,viewState) => {this.props.heatmapSelectState(viewState)}}
        />
      </div>
    )
  }
}

export default class HeatmapController extends React.Component {
  render(){
    return (
      <Paper className="row center-align">
        <PosteriorProbabilitySelect
            resultIDs = {this.props.resultIDs}
            heatmap = {this.props.heatmap}
            heatmapSelectResult = {this.props.heatmapSelectResult}
        />
        <PathwaySelect
            heatmap = {this.props.heatmap}
            heatmapSelectPathway = {this.props.heatmapSelectPathway}
        />
        <StateSelect
            heatmap = {this.props.heatmap}
            heatmapSelectState = {this.props.heatmapSelectState}
        />
      </Paper>
    )
  }
}
