import React from 'react'

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {ControlPanel} from './ControlPanel.jsx';
import {DisplayPanel} from './DisplayPanel.jsx';

var graphvis = require('../bin/graphvis.js');
var classNames = require("classnames");

export class Body extends React.Component {
    constructor(props){
      super(props)
      this.state = {"toggle": "Inference"}
      this.toggleRunType = this.toggleRunType.bind(this);
    }
    componentDidMount(){
      // Init example on first mount
      // this.props.initializePathwayObservation();
    }
    toggleRunType(){
      this.setState({ "toggle": (this.state.toggle === "Inference")? "Learning": "Inference"})
    }
    render(){
      console.log("<Body> render()");
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <main className="row">
          <div className="col s4" style={{minWidth:"300px"}}>
            <ControlPanel
                          observationMap = {this.props.observationMap}
                          pathwayMap = {this.props.pathwayMap}

                          pairwiseInteractions            = {this.props.pairwiseInteractions}

                          uploadList                      = {this.props.uploadList}
                          uploadListAddFailure            = {this.props.uploadListAddFailure}

                          toggleRunType                   = {this.toggleRunType}
                          toggle                          = {this.state.toggle}
                          runInference                    = {this.props.runInference}

                          selectPathways = {this.props.selectPathways}
                          removeSelectedPathways = {this.props.removeSelectedPathways}
                          setActivePathway                = {this.props.setActivePathway}

                          selectObservationSet = {this.props.selectObservationSet}

                          selectObservations = {this.props.selectObservations}
                          removeSelectedObservations = {this.props.removeSelectedObservations}
                          setActiveObservation = {this.props.setActiveObservation}

                          addNewPathway                   = {this.props.addNewPathway}
                          addNewObservationSet            = {this.props.addNewObservationSet}
                          addNewEstimatedParameterSet     = {this.props.addNewEstimatedParameterSet}
                          addNewPosteriorProbabilitySet   = {this.props.addNewPosteriorProbabilitySet}

                          setNodeItemState = {this.props.setNodeItemState} />
          </div>
          <div className="col s8" style={{minWidth:"800px"}}>
            <DisplayPanel />
          </div>
        </main>
        </MuiThemeProvider>
      )
    }
}
