import React from 'react'
import {render} from 'react-dom'

import {Header} from './Header.jsx';
import {Body}   from './BodyPGMBio.jsx';
import {Footer} from './Footer.jsx';

var moment = require('moment')
var graphvis = require('./../bin/graphvis.js');


import {Snackbar} from "material-ui";

import example from "json!./example.json";

export class App extends  React.Component {
    static getCurrentDateTime(){return moment().format('MMM D, YYYY HH:mm')}
    static guid() {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return `${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`;
    }
    static notify(message, duration) {Materialize.toast(message, duration, "rounded")} //Can be moved to its own Notifier component
    constructor(props){
      super(props)
      // console.log("<App> constructor");
      const pairwiseInteractions = {links: new Array(), nodes: new Array()};
      const observationMap = new Map([
        ["All", new Map()],
        ["Current", new Map([
          ["Set", {id:null, name: null, observations: new Array()}], //Indices of .observations
          // ["Selected Observations", new Array()],//Index of active in .observations
          ["Selected Observations", new Set()],
          ["Active Observation", null]
        ])]
      ]);
      const pathwayMap = new Map([
        ["All", new Map()],
        ["Selected", new Map()],
        ["Active", {id: null, name: null}]
      ]);
      const posteriorProbabilitiesMap = new Map([
        ["All", new Map()],
        ["Active", null] //id
      ]);
      // Set initial state
      this.state = {
        "tab": "Run", // || "Results"
        "pairwiseInteractions"        : pairwiseInteractions,
        "observationMap"              : observationMap,
        "pathwayMap"                  : pathwayMap,
        "pathwayMap2":pathwayMap2,
        "runType"                     : "Inference",
        "posteriorProbabilitiesMap"      : posteriorProbabilitiesMap,
        "uploadList"                  : [],
        "estimatedParameterSets"      : []
      };

      // Function binding
      this.setTab = this.setTab.bind(this);

      this.updatePathwayMap = {
        updatePathwaySelect: this.updatePathwaySelect.bind(this)
      }

      this.setActivePathway               = this.setActivePathway.bind(this);

      this.setActiveObservation           = this.setActiveObservation.bind(this);

      this.setNodeItemState               = this.setNodeItemState.bind(this);

      this.toggleRunType                  = this.toggleRunType.bind(this);
      this.runInference                   = this.runInference.bind(this);
      this.handleInferenceResponse = this.handleInferenceResponse.bind(this);

      this.setActivePosteriorProbability  = this.setActivePosteriorProbability.bind(this);
      this.inchlibCluster = this.inchlibCluster.bind(this);

      this.uploadListAddFailure           = this.uploadListAddFailure.bind(this);
      this.addNewPathway                  = this.addNewPathway.bind(this);
      this.addNewObservationSet           = this.addNewObservationSet.bind(this);
      this.addNewEstimatedParameterSet    = this.addNewEstimatedParameterSet.bind(this);
      this.addNewPosteriorProbabilitySet  = this.addNewPosteriorProbabilitySet.bind(this);
    }

    componentDidMount(){
      console.log("componentDidMount: initializeData");
      // EXAMPLE DATA ON INIT
      const EXAMPLEDATA = {
        // For G-protein pathway
        observationSets : new Map([
          ["exampleID1", {"id":"exampleID1", "name":"Example 1", "observations":[
            [ {"name":"49865","state":"3"}],
            [ {"name":"49865","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
          ]}],
          ["exampleID2", {"id":"exampleID2", "name":"Example 2", "observations":[
            [ {"name":"58253","state":"1"},{"name":"415917","state":"2"},{"name":"61076","state":"1"},{"name":"49860","state":"2"}],
            [ {"name":"61074","state":"1"},{"name":"49860","state":"2"},{"name":"58253","state":"2"},{"name":"415917","state":"1"},{"name":"61076","state":"1"}]
          ]}]
        ]),
        current: {
          set : {"id":"exampleID1", "name":"Example 1", "observations":[
            [],
            [ {"name":"49865","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
          ]},
          selected: [0, 1],
          active: 1
        }
      };
      const observationMap = new Map([
        ["All", EXAMPLEDATA.observationSets],
        ["Current", new Map([
          ["Set", EXAMPLEDATA.current.set],
          // ["Selected Observations", EXAMPLEDATA.current.selected], //Indices of .observations
          ["Selected Observations", new Set(EXAMPLEDATA.current.selected)],
          ["Active Observation", EXAMPLEDATA.current.active] //Index of active in .observations
        ])]
      ]);
      const pathwayMap = new Map([
        ["All", new Map(this.props.reactomePathways.map(p => [p.id, p]))],
        ["Selected", new Map([["397795", {id:"397795",name:"G-protein beta:gamma signalling"}]])],
        ["Active", {id:"397795",name:"G-protein beta:gamma signalling"}]
      ]);
      this.props.getReactomePathway(pathwayMap.get("Active")).then(
        pairwiseInteractions => {
          this.setState(
            {observationMap, pathwayMap, pairwiseInteractions},
            ()=>{
              const observation = observationMap.get("Current").get("Set").observations[observationMap.get("Current").get("Active Observation")];
              const observedStates = new Map(observation.map(node=>[node.name, node.state]));
              graphvis.initialize(pairwiseInteractions, observedStates);
            }
          );
        },
        err => {console.log("Could not get initial pairwiseInteraction: ", err)}
      );
    }
    // For ControlPanel vs ResultsPanel
    setTab(tab){
      if (this.state.tab!==tab) {this.setState({tab});};
    }

    updatePathwaySelect(pathway){
    }

    // For PathwaysControl components
    // Pathway object => sets pathwayMap.active, pairwiseInteractions, resets posteriorProbabilities
    //  then draws
    setActivePathway(pathway){
      console.log("setActivePathway");
      let self = this;
      // Define update function for new activePathway
      const update = (pathway, pairwiseInteractions) => {
        let pathwayMap = self.state.pathwayMap;
        pathwayMap.set("Active", pathway);
        self.setState({
          pathwayMap,
          "pairwiseInteractions":pairwiseInteractions,
          "posteriorProbabilities":{}
        }, ()=>{
          let observationMap = self.state.observationMap;
          const activeObservationPosn = observationMap.get("Current").get("Active Observation");
          const observations = observationMap.get("Current").get("Set").observations[activeObservationPosn];
          const observedStates = new Map(observations.map(node => [node.name, node.state]));
          graphvis.render(pairwiseInteractions, observedStates);
        });
      };
      if (pathway.hasOwnProperty("pairwiseInteractions")) {
        // If uploaded, use the uploaded pairwiseInteractions
        update(pathway, pathway.pairwiseInteractions);
      }
      else {
        // Else get from server
        self.props.getReactomePathway(pathway)
          .then(
            pairwiseInteractionsResult=>{
              // console.log("pgmlab.pathway.get", pairwiseInteractionsResult);
              update(pathway, pairwiseInteractionsResult)
            },
            err=>{console.log("Couldn't Get Pathway", pathway.id, err)}
          );
      };
    }

    // For ObservationsControl component
    // Posn of selected activeObservation in current.set.observations => sets current.active
    setActiveObservation(observationIndex){
      console.log("setActiveObservation");
      let observationMap = this.state.observationMap;
      observationMap.get("Current").set("Active Observation", observationIndex);
      this.setState({observationMap},()=>{
        const activeObservation = observationMap.get("Current").get("Set").observations[observationMap.get("Current").get("Active Observation")];
        graphvis.setNodesState(activeObservation);
      });
    }

    // For NodeItem components in Pathways/ObservationsControl
    // node name, state to change to => changes observation node state value in current.set.observations[active]
    setNodeItemState(name,state){
      console.log("setNodeItemState");
      let observationMap = this.state.observationMap;
      let observationSet = observationMap.get("Current").get("Set");
      const activeObservationPosn = observationMap.get("Current").get("Active Observation");
      const nodes = observationSet.observations[activeObservationPosn];
      observationSet.observations[activeObservationPosn] = [... new Set(
        state === "-" ?
          nodes.filter(node => node.name !== name) :
          [...
            [...nodes, {name,state}]
                .reduce((accumulator,node) => {
                  accumulator.set(node.name, node);
                  return accumulator;
                }, new Map())
                .values()
          ]
      )];
      observationMap.get("Current").set("Set",observationSet);
      this.setState({observationMap}, ()=>{
        graphvis.setSingleNodeState({name,state});
      });
    }

    toggleRunType(){
      this.setState({
        "runType": (this.state.runType==="Inference") ? "Learning":"Inference"
      });
    }

    runInference(){
      const observationMap = this.state.observationMap;
      const observationSet = observationMap.get("Current").get("Set");
      const links = this.state.pairwiseInteractions.links;
      const pathways = [...this.state.pathwayMap.get("Selected")].reduce(
        (prev,curr) => {
          prev[curr[0]] = curr[1];
          return prev;
        }, Object.create(null));
      this.props.PGMLabInference(links, observationSet, pathways)
        .then(
          runResponse => { this.handleInferenceResponse(runResponse) },
          err => console.log("Error running inference:", err)
        );
    }
    handleInferenceResponse(runResponse){
      // console.log("response:", runResponse);
      const posteriorProbabilitiesMap = this.state.posteriorProbabilitiesMap;
      const toAdd = {
        type: "Run",
        dateTime: runResponse.submitDateTime,
        id: runResponse.runID,
        posteriorProbabilities: runResponse.posteriorProbabilities,
        observationSet: runResponse.observationSet,
        pathwaySet: runResponse.pathwaySet
      };
      posteriorProbabilitiesMap.get("All").set(toAdd.id, toAdd);
      this.setState({
        posteriorProbabilitiesMap
      }, () => {
        App.notify(`Job Complete: ${toAdd.id}`, 1500);
        // console.log("Added posteriorProbabilities", toAdd.id);
      });
    }
    setActivePosteriorProbability(ppID){
      const posteriorProbabilitiesMap = this.state.posteriorProbabilitiesMap;
      const activePostProbs = posteriorProbabilitiesMap.get("All").get(ppID);
      posteriorProbabilitiesMap.set("Active", activePostProbs);
      this.setState({
        posteriorProbabilitiesMap
      });
    }
    inchlibCluster(pathway){
      // const postProbsMap = this.state.posteriorProbabilitiesMap;
      // const activePostProb = postProbsMap.get("Active")
      // return this.props.callInchlibCluster(pathway, posterior);
    }


    // UPLOADING
    uploadListAddFailure(name, filetype, comment){
      console.log("uploadListAddFailure");
      var uploadList = this.state.uploadList
      var guid       = App.guid()
      var uploadSummary = { "datetime" : App.getCurrentDateTime(),
                            "id"       : guid,
                            "filetype" : filetype,
                            "success"  : false,
                            "name"     : name,
                            "comment"  : comment}
      uploadList.push(uploadSummary)
      this.setState({"uploadList": uploadList})
    }
    addNewPathway(name, pairwiseInteractions){
      console.log("addNewPathway");
      const guid = App.guid()
      const pathway = { "id"                   : guid,
                      "name"                 : name,
                      "pairwiseInteractions" : pairwiseInteractions }
      let pathwayMap = this.state.pathwayMap;
      pathwayMap.get("All").set(guid, pathway)
      const uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Pathway",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""}
      let uploadList = this.state.uploadList;
      uploadList.push(uploadSummary);
      this.setState({ pathwayMap,
                      "uploadList"             : uploadList});
    }
    addNewObservationSet(name, observations){
      console.log("addNewObservationSet");
      let uploadList = this.state.uploadList;
      const guid = App.guid()
      const uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Observation",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""};
      uploadList.push(uploadSummary)
      let observationMap = this.state.observationMap;
      const observationSet = { "id"           : guid,
                             "name"         : name,
                             "observations" : observations}

      observationMap.get("All").set(guid, observationSet);
      this.setState({ observationMap,
                      "uploadList"      : uploadList});
    }
    addNewEstimatedParameterSet(name, cpts){
      console.log("addNewEstimatedParameterSet");
      var guid = App.guid()
      var uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Estimated Parameter",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""}
      var uploadList = this.state.uploadList
      uploadList.push(uploadSummary)
      var estimatedParameterSet = {"id"     : guid,
                                   "name"   : name,
                                   "cpds"   : cpts }
      var estimatedParameterSets = this.state.estimatedParameterSets
      estimatedParameterSets.push(estimatedParameterSet)
      this.setState({"uploadList"            : uploadList,
                    "estimatedParameterSets" : estimatedParameterSets})
    }
    addNewPosteriorProbabilitySet(name, probabilities){
      console.log("addNewPosteriorProbabilitySet: need to add to new this.state.posteriorProbabilitiesSet");
      var guid = App.guid()
      var uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Posterior Probability",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""}
      var uploadList = this.state.uploadList
      var posteriorProbabilitySet = {"id"     : guid,
                                     "name"   : name,
                                     "probablilies"   : probabilities }
      var posteriorProbabilitySets = this.state.posteriorProbabilitySets //this.state.posteriorProbabilities
      posteriorProbabilitySets.push(posteriorProbabilitySet)
      uploadList.push(uploadSummary)
      this.setState({"uploadList": uploadList,
                     "posteriorProbabilitySets": posteriorProbabilitySets})
    }

    //RENDERING//
    render(){
      // console.log("<App> render()");
      return (
        <div>
          <Header tab = {this.state.tab}
                  setTab = {this.setTab}
                  uploadList                      = {this.state.uploadList}
                  uploadListAddFailure            = {this.uploadListAddFailure}
                  addNewPathway                   = {this.addNewPathway}
                  addNewObservationSet            = {this.addNewObservationSet}
                  addNewEstimatedParameterSet     = {this.addNewEstimatedParameterSet}
                  addNewPosteriorProbabilitySet   = {this.addNewPosteriorProbabilitySet} />
          <Body tab = {this.state.tab}

                pairwiseInteractions            = {this.state.pairwiseInteractions}

                observationMap = {this.state.observationMap}
                selectObservationSet = {this.selectObservationSet}
                selectObservations = {this.selectObservations}
                removeSelectedObservations = {this.removeSelectedObservations}
                setActiveObservation = {this.setActiveObservation}

                pathwayMap = {this.state.pathwayMap}
                updatePathwayMap = {this.updatePathwayMap}
                selectPathways = {this.selectPathways}
                removeSelectedPathways = {this.removeSelectedPathways}
                setActivePathway                = {this.setActivePathway}

                setNodeItemState = {this.setNodeItemState}

                runType = {this.state.runType}
                toggleRunType = {this.toggleRunType}
                runInference                    = {this.runInference}

                posteriorProbabilitiesMap = {this.state.posteriorProbabilitiesMap}
                setActivePosteriorProbability = {this.setActivePosteriorProbability}

                inchlibCluster = {this.inchlibCluster}
                />
          <Footer />
        </div>
      )
    }
};
