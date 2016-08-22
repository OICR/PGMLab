import React from "react";
import RunView from "./RunView/RunView.jsx";

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
      }
    }
    render(){
      return (
        <main>
          {this.getView()}
        </main>
      )
    }
}
