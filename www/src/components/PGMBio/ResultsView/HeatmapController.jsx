import React from "react"
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

export default class HeatmapController extends React.Component {
  constructor(props){
    super(props)
    this.changeResult = (evt,idx,viewResult) => {this.props.heatmapSelectResult(viewResult)}
    this.changePathway = (evt,idx,viewPathway) => {this.props.heatmapSelectPathway(viewPathway)}
    this.changeState = (evt,idx,viewState) => {this.props.heatmapSelectState(viewState)}
  }
  render(){
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
    return (
      <Paper className="row center-align">
        <div className="col s4">
          <SelectField fullWidth={true} autoWidth={true} hintText="Select a result"
              value={this.props.heatmap.get("viewResult")}
              children={
                this.props.resultIDs.valueSeq()
                  .map(runID =>
                    <MenuItem key={runID} value={runID} primaryText={runID} autoWidth={false} label={runID}/>
                  )
              }
              onChange={this.changeResult}
          />
        </div>
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
              onChange={this.changePathway}
          />
        </div>
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
              onChange={this.changeState}
          />
        </div>
      </Paper>
    )
  }
}
