import React from 'react'
import {render} from 'react-dom'

import {Header} from './Header.jsx';
import {Body}   from './Body.jsx';
import {Footer} from './Footer.jsx';

var moment = require('moment')
var graphvis = require('./../bin/graphvis.js');

export class App extends  React.Component {
    static getCurrentDateTime(){return moment().format('MMM D, YYYY HH:mm')}
    static guid() {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return `${s4()+s4()} - ${s4()} - ${s4()} - ${s4()} - ${s4()+s4()+s4()}`;
    }
    constructor(props){
      super(props)
      console.log("<App> constructor");
      const pairwiseInteractions = {links: new Array(), nodes: new Array()};
      const observationMap = new Map([
        ["All", new Map()],
        ["Current", new Map([
          ["Set", {id:null, name: null, observations: new Array()}], //Indices of .observations
          ["Selected Observations", new Array()],//Index of active in .observations
          ["Active Observation", null]
        ])]
      ]);
      const pathwayMap = new Map([
        ["All", new Map()],
        ["Selected", new Map()],
        ["Active", {id: null, name: null}]
      ]);
      // Set initial state
      this.state = {
        "pairwiseInteractions"        : pairwiseInteractions,
        "observationMap"              : observationMap,
        "pathwayMap"                  : pathwayMap,
        "runType"                     : "Inference",
        "uploadList"                  : [],
        "posteriorProbabilitySets"    : [],
        "estimatedParameterSets"      : []
      };

      // Function binding
      this.selectPathways                 = this.selectPathways.bind(this);
      this.removeSelectedPathways         = this.removeSelectedPathways.bind(this);
      this.setActivePathway               = this.setActivePathway.bind(this);

      this.selectObservationSet           = this.selectObservationSet.bind(this);
      this.selectObservations             = this.selectObservations.bind(this);
      this.removeSelectedObservations     = this.removeSelectedObservations.bind(this);
      this.setActiveObservation           = this.setActiveObservation.bind(this);

      this.setNodeItemState               = this.setNodeItemState.bind(this);

      this.toggleRunType                  = this.toggleRunType.bind(this);
      this.runInference                   = this.runInference.bind(this);

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
            [ ],
            [ {"name":"49860","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
          ]}],
          ["exampleID2", {"id":"exampleID2", "name":"Example 2", "observations":[
            [ {"name":"58253","state":"1"},{"name":"415917","state":"2"},{"name":"61076","state":"1"},{"name":"49860","state":"2"}],
            [ {"name":"61074","state":"1"},{"name":"49860","state":"2"},{"name":"58253","state":"2"},{"name":"415917","state":"1"},{"name":"61076","state":"1"}]
          ]}]
        ]),
        current: {
          set : {"id":"exampleID1", "name":"Example 1", "observations":[
            [],
            [ {"name":"49860","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
          ]},
          selected: [0, 1],
          active: 1
        }
      };
      const observationMap = new Map([
        ["All", EXAMPLEDATA.observationSets],
        ["Current", new Map([
          ["Set", EXAMPLEDATA.current.set],
          ["Selected Observations", EXAMPLEDATA.current.selected], //Indices of .observations
          ["Active Observation", EXAMPLEDATA.current.active] //Index of active in .observations
        ])]
      ]);
      const pathwayMap = new Map([
        ["All", new Map(this.props.reactomePathways.map(p => [p.id, p]))],
        ["Selected", new Map([["397795", {id:"397795",name:"G-protein beta:gamma signalling"}]])],
        ["Active", {id:"397795",name:"G-protein beta:gamma signalling"}]
      ]);
      console.log(this);


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

      ;
    }

    // For SelectPathways modal component
    // [pathwayIDs] =>  and adds to list of possible active pathways
    selectPathways(pathwayIDs){
      console.log("selectPathway")
      let pathwayMap = this.state.pathwayMap;
      for (let pathwayID of pathwayIDs) {
        if (!pathwayMap.get("Selected").has(pathwayID)) {
          const pathwayObj = pathwayMap.get("All").get(pathwayID);
          pathwayMap.get("Selected").set(pathwayID, pathwayObj);
        };
      };
      this.setState({pathwayMap});
    }
    // For SelectPathways modal component
    // [pathwayIDs] removes them from list of possible active pathways
    removeSelectedPathways(pathwayIDs){
      console.log("removeSelectedPathways");
      let pathwayMap = this.state.pathwayMap;
      for (let pathwayID of pathwayIDs) {
        if (pathwayMap.get("Selected").has(pathwayID)) {
          pathwayMap.get("Selected").delete(pathwayID);
        };
      };
      this.setState({pathwayMap});
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
          // "observedNodes":[],
          "posteriorProbabilities":{}
        }, self.drawPathway(pairwiseInteractions));
      };
      pathway.hasOwnProperty("pairwiseInteractions") ?
        // If uploaded, use the uploaded pairwiseInteractions
        update(pathway, pathway.pairwiseInteractions) :
        // Else get from server
        self.props.getReactomePathway(pathway)
          .then(
            pairwiseInteractionsResult=>{
              // console.log("pgmlab.pathway.get", pairwiseInteractionsResult);
              update(pathway, pairwiseInteractionsResult)
            },
            err=>{console.log("Couldn't Get Pathway", pathway.id, err)}
          );
    }

    // For SelectObservations modal component
    // observationSetID =>  changes observationMap.Current to that new set
    selectObservationSet(observationSetID){
      console.log("selectObservationSet");
      let observationMap = this.state.observationMap;
      const selectedSet = observationMap.get("All").get(observationSetID);
      observationMap.set("Current", new Map([
        ["Set", selectedSet],
        ["Selected Observations", [...selectedSet.observations.keys()]],
        ["Active Observation", 0]
      ]));
      this.setState({observationMap});
    }
    // For SelectObservations modal component
    // [indices (from current set's observation property) of to be selected observations]
    //  => adds them to list of possible active observations
    selectObservations(observationIndices){
      console.log("selectObservations");
      let observationMap = this.state.observationMap;
      const currentSet = new Set(observationMap.get("Current").get("Selected Observations"));
      const toAddSet = new Set(observationIndices);
      const mergeSet = new Set([...currentSet, ...toAddSet]);
      observationMap.get("Current").set("Selected Observations", [...mergeSet]);
      this.setState({observationMap});
    }
    // For SelectObservations modal component
    // [indices (from current set's observation property) of to be removed observations]
    //  => removes them from list of possible active observations
    removeSelectedObservations(observationIndices){
      console.log("removeSelectedObservations");
      let observationMap = this.state.observationMap;
      const selectedSet = new Set(observationMap.get("Current").get("Selected Observations"));
      const toRemoveSet = new Set(observationIndices);
      const differenceSet = new Set([...selectedSet].filter(o=> !toRemoveSet.has(o)));
      observationMap.get("Current").set("Selected Observations", [...differenceSet]);
      this.setState({observationMap});
      // Add checker for unselecting the active observation
    }
    // For ObservationsControl component
    // Posn of selected activeObservation in current.set.observations => sets current.active
    setActiveObservation(observationIndex){
      console.log("setActiveObservation");
      let observationMap = this.state.observationMap;
      observationMap.get("Current").set("Active Observation", observationIndex);
      this.setState({observationMap},()=>{
        const activeObservationIndex = observationMap.get("Current").get("Active Observation");
        // console.log(activeObservationIndex);
        // console.log(observationMap.get("Current").get("Set").observations[activeObservationIndex]);
        graphvis.initializeObservation(observationMap.get("Current").get("Set").observations[activeObservationIndex]);
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
        graphvis.setNodeState({name,state});
      });
    }

    // Initialize Pathway/Observation
    drawPathway(pairwiseInteractions){
      console.log("drayPathway");
      var datasetnodes = graphvis.render(pairwiseInteractions);
    }

    toggleRunType(){
      this.setState({ "runType": (this.state.runType === "Inference") ? "Learning" : "Inference"})
    }
    runInference(){
      // console.log("runInference", this.state.observedNodes);
      var self = this;
      let observations = this.state.selectedObservationSet.observations[this.state.selectedObservations.get("Active")];
      // console.log(observations);
      // observations = observations.map(node => {node.name:node.state});
      // console.log(observations);
      connection.session
        // .call('pgmlab.inference.run', [this.state.pairwiseInteractions.links, this.state.observedNodes, []])
        .call("pgmlab.inference.run", [this.state.pairwiseInteractions.links, observations,[]])
        .then(
          function(response) {
            // console.log("response:", response);
            self.setState({"posteriorProbabilities": response["posteriorProbabilities"]})
            graphvis.addPosteriorProbabilities(self.state.posteriorProbabilities);
          },
          function (err) {
            console.log("Error running inference:", err);
          }
        );
    }

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
      // var pathways = this.state.pathways
      const guid = App.guid()
      const pathway = { "id"                   : guid,
                      "name"                 : name,
                      "pairwiseInteractions" : pairwiseInteractions }
      // pathways.push(pathway)

      let pathwayMap = this.state.pathwayMap;
      pathwayMap.get("All").set(guid, pathway)
      //
      // graphvis.render(pairwiseInteractions)
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
      console.log("addNewPosteriorProbabilitySet");
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
      var posteriorProbabilitySets = this.state.posteriorProbabilitySets
      posteriorProbabilitySets.push(posteriorProbabilitySet)
      uploadList.push(uploadSummary)
      this.setState({"uploadList": uploadList,
                     "posteriorProbabilitySets": posteriorProbabilitySets})
    }

    //RENDERING//
    render(){
      console.log("<App> render()");
      return (
        <div>
          <Header />
          <Body pairwiseInteractions            = {this.state.pairwiseInteractions}

                observationMap = {this.state.observationMap}
                selectObservationSet = {this.selectObservationSet}
                selectObservations = {this.selectObservations}
                removeSelectedObservations = {this.removeSelectedObservations}
                setActiveObservation = {this.setActiveObservation}

                pathwayMap = {this.state.pathwayMap}
                selectPathways = {this.selectPathways}
                removeSelectedPathways = {this.removeSelectedPathways}
                setActivePathway                = {this.setActivePathway}

                setNodeItemState = {this.setNodeItemState}

                runType = {this.state.runType}
                toggleRunType = {this.toggleRunType}
                runInference                    = {this.runInference}

                uploadList                      = {this.state.uploadList}
                uploadListAddFailure            = {this.uploadListAddFailure}
                addNewPathway                   = {this.addNewPathway}
                addNewObservationSet            = {this.addNewObservationSet}
                addNewEstimatedParameterSet     = {this.addNewEstimatedParameterSet}
                addNewPosteriorProbabilitySet   = {this.addNewPosteriorProbabilitySet} />
          <Footer />
        </div>
      )
    }
};
