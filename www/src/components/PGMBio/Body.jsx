import React from "react"
import RunView from "./RunView/RunView.jsx"
import {grey200} from "material-ui/styles/colors"

import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
class ResultsView extends React.Component {
  render(){
    return (
      <div className="row" style={{marginBottom:"0px"}}>
        <div classname="col s11">
          <div className="card-panel">
            <Paper className="row center-align">
              <div className="col s6">
                <SelectField fullWidth={true} autoWidth={true} hintText="Select a pathway"
                  value={1} children={[]} onChange={evt => {}}
                />
              </div>
              <div className="col s6">
                <SelectField fullWidth={true} autoWidth={true} hintText="Select a state"
                  value={1} children={[]} onChange={evt => {}}
                />
              </div>
            </Paper>
            <div>
              Heatmap Goes here
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default class Body2 extends React.Component {
    constructor(props){
      super(props);
      this.getView = this.getView.bind(this);
    }
    getView(){
      switch (this.props.view) {
        case "Run":
          return (
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
            />
          )
        case "Results":
          return (
            <ResultsView />
          )
      }
    }
    render(){
      return (
        <main style={{backgroundColor:grey200}}>
          {this.getView()}
        </main>
      )
    }
}
