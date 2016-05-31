import React from 'react'
import {render} from 'react-dom'

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import {Header} from './components/Header.jsx';
import {Body}   from './components/Body.jsx';
import {Footer} from './components/Footer.jsx';

var materialize = require('./lib/materialize.min.js')
var moment = require('moment')
var graphvis = require('./bin/graphvis.js');

var EXAMPLEDATA = {
  // For G-protein pathway
  observationSets : new Map([
    ["exampleID1", {"id":"exampleID1", "name":"Example 1", "observations":[
      [ {"name":"49860","state":"1"},{"name":"58253","state":"2"},{"name":"415917","state":"3"},{"name":"61076","state":"1"}],
      [ {"name":"49860","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
    ]}],
    ["exampleID2", {"id":"exampleID2", "name":"Example 2", "observations":[
      [ {"name":"58253","state":"1"},{"name":"415917","state":"2"},{"name":"61076","state":"1"},{"name":"49860","state":"2"}],
      [ {"name":"61074","state":"1"},{"name":"49860","state":"2"},{"name":"58253","state":"2"},{"name":"415917","state":"1"},{"name":"61076","state":"1"}]
    ]}]
  ]),
  current: {
    set : {"id":"exampleID1", "name":"Example 1", "observations":[
      [ {"name":"49860","state":"1"},{"name":"58253","state":"2"},{"name":"415917","state":"3"},{"name":"61076","state":"1"}],
      [ {"name":"49860","state":"2"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
    ]},
    selected: [0, 1],
    active: 0
  }
};

class App extends  React.Component {
    constructor(props){
      super(props)
      // EXAMPLE DATA ON INIT
      let observationSets = EXAMPLEDATA.observationSets;
      let selectedObservationSet = observationSets.get("exampleID1");
      let selectedObservations = new Map([["Indices",[0,1]],["Active",0]]);
      let selectedPathways = new Map([["Pathways", new Array("397795")],["Active",{id:"397795",name:"G-protein beta:gamma signalling"}]]);
      //
      let pathwayMap = this.props.pathwayMap;
      pathwayMap.set("Selected", new Map([["397795", {id:"397795",name:"G-protein beta:gamma signalling"}]]));
      pathwayMap.set("Active", {id:"397795",name:"G-protein beta:gamma signalling"});

      let observationMap = new Map([
        ["All", EXAMPLEDATA.observationSets],
        ["Current", new Map([
          ["Set", EXAMPLEDATA.current.set],
          ["Selected Observations", EXAMPLEDATA.current.selected],
          ["Active Observation", EXAMPLEDATA.current.active]
        ])]
      ]);
      // Set initial state
      this.state = {  "observationMap": observationMap,
                      "pathwayMap" : pathwayMap,
                      "pathways"                        : this.props.pathways,
                      "pairwiseInteractions"            : this.props.pairwiseInteractions,
                      "uploadList"                      : [],
                      //
                      "selectedPathways": selectedPathways,
                      //
                      "observationSets"                 : observationSets,
                      "selectedObservationSet": selectedObservationSet,
                      "selectedObservations": selectedObservations,
                      //
                      "posteriorProbabilitySets"        : [],
                      "estimatedParameterSets"          : []
                    };

      this.setActivePathway               = this.setActivePathway.bind(this);
      this.observeNode                    = this.observeNode.bind(this);
      this.removeObservedNode             = this.removeObservedNode.bind(this);
      this.runInference                   = this.runInference.bind(this);
      this.setNodeState                   = this.setNodeState.bind(this);
      this.setNodeItemState = this.setNodeItemState.bind(this);

      this.selectPathways = this.selectPathways.bind(this);
      this.removeSelectedPathways = this.removeSelectedPathways.bind(this);

      this.selectObservationSet = this.selectObservationSet.bind(this);
      this.selectObservations = this.selectObservations.bind(this);
      this.removeSelectedObservations = this.removeSelectedObservations.bind(this);
      this.setActiveObservation = this.setActiveObservation.bind(this);

      this.uploadListAddFailure           = this.uploadListAddFailure.bind(this);
      this.addNewPathway                  = this.addNewPathway.bind(this);
      this.addNewObservationSet           = this.addNewObservationSet.bind(this);
      this.addNewEstimatedParameterSet    = this.addNewEstimatedParameterSet.bind(this);
      this.addNewPosteriorProbabilitySet  = this.addNewPosteriorProbabilitySet.bind(this);


    }

    static getCurrentDateTime(){return moment().format('MMM D, YYYY HH:mm')}

    // For SelectPathways modal component
    // [pathwayIDs] =>  and adds to list of possible active pathways
    selectPathways(pathwayIDs){
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
      let pathwayMap = this.state.pathwayMap;
      for (let pathwayID of pathwayIDs) {
        if (pathwayMap.get("Selected").has(pathwayID)) {
          pathwayMap.get("Selected").delete(pathwayID);
        };
      };
      this.setState({pathwayMap});
    }

    // For SelectObservations modal component
    // observationSetID =>  changes observationMap.Current to that new set
    selectObservationSet(observationSetID){
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
      console.log("removeSelectedObservations", observationIndices);
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
      let observationMap = this.state.observationMap;
      observationMap.get("Current").set("Active Observation", observationIndex);
      this.setState({observationMap});
    }
    // For PathwaysControl components
    setActivePathway(pathway){
      let self = this;
      let selectedPathways = this.state.selectedPathways;
      selectedPathways.set("Active", pathway);
      const updatePairwise = (pairwiseInteractions) => {
        self.setState({
          "selectedPathways":selectedPathways,
          "pairwiseInteractions":pairwiseInteractions,
          "observedNodes":[],
          "posteriorProbabilities":{}
        }, ()=>{graphvis.render(pairwiseInteractions)});
      };
      // If uploaded, use the uploaded pairwiseInteractions
      if (pathway.hasOwnProperty("pairwiseInteractions")) {
        updatePairwise(pathway.pairwiseInteractions);
      }
      // Else get from server
      else {
        connection.session.call("pgmlab.pathway.get", [pathway.id])
        .then(
          (pairwiseInteractionsResult)=>{updatePairwise(pairwiseInteractionsResult)},
          (err)=>{console.log("Couldn't Get Pathway", pathway.id, err)}
        );
      };
    }
    // For NodeItem components in Pathways/ObservationsControl
    setNodeItemState(name,state){
      // console.log("setNodeItemState", name, state);
      let selectedObservationSet = this.state.selectedObservationSet;
      let observation = selectedObservationSet.observations[this.state.selectedObservations.get("Active")];
      const posn = observation.findIndex((node)=>node.name===name);
      switch (state) {
        case ("-"):
          if (posn !== -1) { observation.splice(posn,1); };
          break;
        default:
          switch (posn) {
            case (-1): observation.splice(0,0,{name,state}); break;
            default: observation[posn].state = state;
          };
      };
      selectedObservationSet.observations[this.state.selectedObservations.get("Active")] = observation;
      this.setState({"selectedObservationSet":selectedObservationSet});
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

    observeNode(node, runType){
      // console.log("observeNode", node, runType)
      var selectedObservationSet = (runType === "inference")? this.state.selectedObservationSetInference : this.state.selectedObservationSetLearning
      // console.log("selectedObservationSet", selectedObservationSet)
      var activeIndex = this.state.observationSets[selectedObservationSet].activeIndex
      // console.log("activeIndex", activeIndex)
      // console.log("obs", selectedObservationSet.observations)
      var activeNodes =  this.state.observationSets[selectedObservationSet].observations[activeIndex].nodes
      var found = activeNodes.some(function (el) { return el.name === node.name  })
      if (!found) {
        node["state"] = 1;
        graphvis.setNodeState(node)
        // console.log("activeNodes", activeNodes, node)
        var newNodes = activeNodes.concat([node]);
        // console.log("newNodes", newNodes, activeNodes)
        var observationSets = this.state.observationSets
        observationSets[selectedObservationSet].observations[activeIndex].nodes = $.extend( true, [], newNodes)
        // console.log("nodes",selectedObservationSet.observations[selectedObservationSet.activeIndex])
        // console.log("soss",observationSet)
        if (runType ==="inference") {
            this.setState({"selectedObservationSetInference": observationSets})
        }
        else {
            this.setState({"selectedObservationSetLearning": observationSets})
        }
      }
    }

    removeObservedNode(node){
      console.log("removeObservedNode");
          var observedNodes = $.grep(this.state.observedNodes, function(e){
              return e.name != node.name;
          });
          this.setState({'observedNodes': observedNodes});
          graphvis.removeMutatedGene(node);
    }

    setNodeState(node, option){
      console.log("setNodeState");
        var observedNodes = this.state.observedNodes
        for (var i = 0; i < observedNodes.length; i++) {
            var observation = observedNodes[i];
            if (observation.name === node.name) {
                observation.state = option.value
            }
        }

        node["state"] = option.value

        graphvis.setNodeState(node)
        this.setState({"observedNodes": observedNodes});
    }

    static guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
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
      var pathways = this.state.pathways
      var guid = App.guid()
      var pathway = { "id"                   : guid,
                      "name"                 : name,
                      "pairwiseInteractions" : pairwiseInteractions }
      pathways.push(pathway)
      //
      // graphvis.render(pairwiseInteractions)
      var uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Pathway",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""}
      var uploadList = this.state.uploadList
      uploadList.push(uploadSummary)
      this.setState({ "pathways"               : pathways,
                      "activePathway"          : pathway,
                      "pairwiseInteractions"   : pairwiseInteractions,
                      "posteriorProbabilities" : {},
                      "uploadList"             : uploadList});
    }
    addNewObservationSet(name, observations){
      console.log("addNewObservationSet");
      var guid = App.guid()
      var uploadSummary = { "datetime": App.getCurrentDateTime(),
                            "id"      : guid,
                            "filetype": "Observation",
                            "success" : true,
                            "name"    : name,
                            "comment" : ""}
      var uploadList = this.state.uploadList
      uploadList.push(uploadSummary)
      var observationSet = { "id"           : guid,
                             "name"         : name,
                             "activeIndex"  : 0,
                             "observations" : observations}
      // Convert to object
      // var observationSets = this.state.observationSets
      // observationSets.push(observationSet)
      let observationSets = this.state.observationSets;
      observationSets.set(guid, observationSet);
      // console.log("observationSets", observationSets)
      this.setState({"uploadList"      : uploadList,
                     "observationSets" : observationSets})
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
    //  console.log("Rendering App: ", this)
      return (
        <div>
          <Header />
          <Body uploadList                      = {this.state.uploadList}
                uploadListAddFailure            = {this.uploadListAddFailure}
                addNewPathway                   = {this.addNewPathway}
                addNewObservationSet            = {this.addNewObservationSet}
                addNewEstimatedParameterSet     = {this.addNewEstimatedParameterSet}
                addNewPosteriorProbabilitySet   = {this.addNewPosteriorProbabilitySet}

                pathwayMap = {this.state.pathwayMap}
                pathways                        = {this.props.pathways}
                pairwiseInteractions            = {this.state.pairwiseInteractions}
                observationSets                 = {this.state.observationSets}

                selectPathways = {this.selectPathways}
                removeSelectedPathways = {this.removeSelectedPathways}
                selectedPathways = {this.state.selectedPathways}

                observationMap = {this.state.observationMap}
                selectObservationSet = {this.selectObservationSet}
                selectedObservationSet = {this.state.selectedObservationSet}
                selectObservations = {this.selectObservations}
                removeSelectedObservations = {this.removeSelectedObservations}
                selectedObservations = {this.state.selectedObservations}
                setActiveObservation = {this.setActiveObservation}

                setActivePathway                = {this.setActivePathway}

                observeNode                     = {this.observeNode}
                removeObservedNode              = {this.removeObservedNode}
                runInference                    = {this.runInference}
                setNodeState                    = {this.setNodeState}

                setNodeItemState = {this.setNodeItemState} />
          <Footer />
        </div>
      )
    }
};

try {
   var autobahn = require('autobahn');
} catch (e) {
   console.log("e", e);
};

var wsuri = (document.location.origin == "file://")?
    "ws://127.0.0.1:9000/ws":
    (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});

function getPathway(session, pathways, initPathway) {
    session.call('pgmlab.pathway.get', [initPathway.id]).then(
          function(res) {
               const pairwiseInteractions = res;
              //  console.log("getPathway:", res);
               init(pathways, pairwiseInteractions);
          },
          function (err) {
              console.log("couldn't get pathway", initPathway.id, err);
          });
};

connection.onopen = function (session, details) {
   console.log("Connected");
   session.call('pgmlab.pathways.list').then(
         function (res) {
            //Init pathway
            const pathways = res;
            const initPathway = pathways[0]; // This should correspond to the mock data in the App constructor
            // console.log("connection.onopen:", res);
            //
            getPathway(session, pathways, initPathway);
         },
         function (err) {
            console.log("getPathwayList() error:", err);
         });
};


connection.onclose = function (reason, details) {
   console.log("Connection lost: " + reason);
   if (t1) {
      clearInterval(t1);
      t1 = null;
   };
   if (t2) {
      clearInterval(t2);
      t2 = null;
   };
};

connection.open();

function init(pathways, pairwiseInteractions) {
  // console.log("init:", pathways, pairwiseInteractions);
  const pathwayMap = new Map([["All", new Map(pathways.map(p => [p.id, p]))]]);
  render(<App pathwayMap={pathwayMap}
              pathways={pathways}
              pairwiseInteractions={pairwiseInteractions} />, document.getElementById('app'));
};
