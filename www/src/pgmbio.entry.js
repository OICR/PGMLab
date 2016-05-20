 var materialize = require('./lib/materialize.min.js')

//require("jquery")
//require("materialize-css") didn't work

import React from 'react'
import { render } from 'react-dom'
var moment = require('moment')

import {Header} from './components/Header.jsx';
import {Body}   from './components/Body.jsx';
import {Footer} from './components/Footer.jsx';

var graphvis = require('./bin/graphvis.js');

var EXAMPLEDATA = {
  // For G-protein pathway
  observationSets : new Map([
    ["exampleID1", {"id":"exampleID1", "name":"Example 2", "observations":[
      [ {"name":"49860","state":"1"},{"name":"58253","state":"0"},{"name":"415917","state":"0"},{"name":"61076","state":"1"}],
      [ {"name":"49860","state":"0"},{"name":"58253","state":"1"},{"name":"415917","state":"1"},{"name":"61076","state":"2"},{"name":"61074","state":"1"}]
    ]}],
    ["exampleID2", {"id":"exampleID2", "name":"Example 1", "observations":[
      [ {"name":"49860","state":"0"},{"name":"58253","state":"1"},{"name":"415917","state":"0"},{"name":"61076","state":"1"}],
      [ {"name":"49860","state":"0"},{"name":"58253","state":"2"},{"name":"415917","state":"1"},{"name":"61076","state":"1"},{"name":"61074","state":"1"}]
    ]}]
  ])
};

class App extends  React.Component {
    constructor (props) {
      super(props)
      // var observationSets =  {};
      // observationSets["someID"] = { "id":'someID', "name":"One","observations":[]};
      // let observationSets = new Map([
      //   // ['someID1',{ "id":'someID1', "name":"One","observations":[]}],
      //   // ['someID2',{ "id":'someID2', "name":"One","observations":[]}],
      //   // ['someID3',{ "id":'someID3', "name":"One","observations":[]}],
      //   // ['someID4',{ "id":'someID4', "name":"One","observations":[]}]
      // ]);
      let observationSets = EXAMPLEDATA.observationSets;
      let selectedObservationSet = new Map([
        // ["Inference", { "id":'someID1', "name":"One","observations":[]}],
        // ["Learning", { "id":'someID1', "name":"One","observations":[]}]
        ["Inference", observationSets.get("exampleID1")],
        ["Learning", observationSets.get("exampleID2")]
      ]);
      let selectedObservations = new Map([
        ["Inference", new Map([["Indices",[]],["Active",0]])], //Array of indices
        ["Learning", new Map([["Indices",[]],["Active",0]])]
      ]);
      //
      let selectedPathways = new Map([
        ["Inference", new Array()],
        ["Learning", new Array()]
      ]);
      this.state = {  "pathways"                         : this.props.pathways,
                      "activePathway"                   : this.props.activePathway,
                      "uploadList"                      : [],
                      "selectedPathways": selectedPathways,
                      //
                      "observationSets"                 : observationSets,
                      "selectedObservationSet": selectedObservationSet,
                      "selectedObservations": selectedObservations,
                      //
                      "activeObservation": 0, //index of currently activated observationSet's .observation
                      //
                      "posteriorProbabilitySets"        : [],
                      "estimatedParameterSets"          : [],
                      "pairwiseInteractions"            : this.props.pairwiseInteractions }


      this.setActivePathway               = this.setActivePathway.bind(this)
      this.observeNode                    = this.observeNode.bind(this)
      this.removeObservedNode             = this.removeObservedNode.bind(this)
      this.runInference                   = this.runInference.bind(this)
      this.setNodeState                   = this.setNodeState.bind(this)

      this.selectPathways = this.selectPathways.bind(this);
      this.removeSelectedPathways = this.removeSelectedPathways.bind(this);
      this.selectObservationSet = this.selectObservationSet.bind(this);
      this.selectObservations = this.selectObservations.bind(this);
      this.removeSelectedObservations = this.removeSelectedObservations.bind(this);

      this.setActiveObservation = this.setActiveObservation.bind(this);

      this.uploadListAddFailure           = this.uploadListAddFailure.bind(this)
      this.addNewPathway                  = this.addNewPathway.bind(this)
      this.addNewObservationSet           = this.addNewObservationSet.bind(this)
      this.addNewEstimatedParameterSet    = this.addNewEstimatedParameterSet.bind(this)
      this.addNewPosteriorProbabilitySet  = this.addNewPosteriorProbabilitySet.bind(this)
    }

    static getCurrentDateTime() {
        return moment().format('MMM D, YYYY HH:mm')
    }

    // For SelectPathways modal component
    selectPathways(pathwayIDs, runType){
      // console.log("selectPathways", pathwayIDs.length, runType);
      let selectedPathways = this.state.selectedPathways;
      let selected=this.state.selectedPathways.get(runType);
      for (let pathwayID of pathwayIDs) {
        if (!selected.includes(pathwayID)) {
          selected.push(pathwayID);
        };
      };
      selectedPathways.set(runType, selected);
      this.setState({"selectedPathways":selectedPathways});
    }
    // For SelectPathways modal component
    removeSelectedPathways(pathwayIDs, runType){
      // console.log("removeSelectedPathways", pathwayIDs);
      let selectedPathways = this.state.selectedPathways;
      let selected = selectedPathways.get(runType);
      const indices = pathwayIDs.map((pathway)=>{return selected.indexOf(pathway)});
      const reducedSelected = selected.reduce((remaining,pathwayID,index)=>{
        if (!indices.includes(index)) {
          remaining.push(pathwayID);
        };
        return remaining;
      },[]);
      selectedPathways.set(runType, reducedSelected);
      this.setState({"selectedPathways":selectedPathways});
    }

    // For SelectObservations modal component
    selectObservationSet(observationSetID, runType){
      let selectedObservationSet = this.state.selectedObservationSet;
      const selectedSet = this.state.observationSets.get(observationSetID);
      selectedObservationSet.set(runType, selectedSet);
      let selectedObservations = this.state.selectedObservations;
      const obs = new Map([
        ["Indices", [... selectedSet.observations.keys()]], //array of number values for index in set.observations
        ["Active", 0] //first observation in set is set to active
      ]);
      selectedObservations.set(runType, obs); //array of numbers, not strings
      this.setState({
        "selectedObservationSet":selectedObservationSet,
        "selectedObservations":selectedObservations
      });
    }
    // For SelectObservations modal component
    selectObservations(observationIndices, runType){
      console.log('selectObservations',observationIndices, runType)
      let selectedObservations = this.state.selectedObservations;
      const indices = selectedObservations.get(runType).get("Indices");
      for (let index of observationIndices) {
        if (!indices.includes(index)) {
          indices.push(index);
        };
      };
      selectedObservations.get(runType).set("Indices", indices);
      this.setState({"selectedObservations": selectedObservations})
    }
    // For SelectObservations modal component
    removeSelectedObservations(observationIndices, runType){
      // console.log("removeSelectedObservations", observationIndices);
      let selectedObservations = this.state.selectedObservations;
      let selected = selectedObservations.get(runType).get("Indices");
      const reducedSelected = selected.reduce((remaining,observationIndex)=>{
        if (!observationIndices.includes(observationIndex)) {
          remaining.push(observationIndex);
        };
        return remaining;
      },[]);
      // Add checker for unselecting the active observation
      //
      selectedObservations.get(runType).set("Indices",reducedSelected);
      this.setState({"selectedObservations": selectedObservations});
    }

    // For ObservationsControl component
    setActiveObservation(observationIndex, runType){ //Index in selectedObservationSet.observations
      let selectedObservations = this.state.selectedObservations;
      selectedObservations.get(runType).set("Active", observationIndex)
      this.setState({"selectedObservations": selectedObservations});
    }

    runInference() {
        console.log("runInference");
        var self = this;
        connection.session.call('pgmlab.inference.run', [this.state.pairwiseInteractions.links, this.state.observedNodes, []]).then(
          function(response) {
            self.setState({"posteriorProbabilities": response["posteriorProbabilities"]})
            graphvis.addPosteriorProbabilities(self.state.posteriorProbabilities);
          },
          function (err) {
            console.log("couldn't run inference", err);
          })
    }

    observeNode(node, runType) {
      console.log("observeNode", node, runType)
      var selectedObservationSet = (runType === "inference")? this.state.selectedObservationSetInference : this.state.selectedObservationSetLearning
      console.log("selectedObservationSet", selectedObservationSet)
      var activeIndex = this.state.observationSets[selectedObservationSet].activeIndex
      console.log("activeIndex", activeIndex)
      console.log("obs", selectedObservationSet.observations)
      var activeNodes =  this.state.observationSets[selectedObservationSet].observations[activeIndex].nodes
      var found = activeNodes.some(function (el) { return el.name === node.name  })
      if (!found) {
        node["state"] = 1;
        graphvis.setNodeState(node)
        console.log("activeNodes", activeNodes, node)
        var newNodes = activeNodes.concat([node]);
        console.log("newNodes", newNodes, activeNodes)
        var observationSets = this.state.observationSets
        observationSets[selectedObservationSet].observations[activeIndex].nodes = $.extend( true, [], newNodes)
        console.log("nodes",           selectedObservationSet.observations[selectedObservationSet.activeIndex])
        console.log("soss", observationSet)
        if (runType ==="inference") {
            this.setState({"selectedObservationSetInference": observationSets})
        }
        else {
            this.setState({"selectedObservationSetLearning": observationSets})
        }
      }
    }

    removeObservedNode(node) {
      console.log("removeObservedNode");
          var observedNodes = $.grep(this.state.observedNodes, function(e){
              return e.name != node.name;
          });
          this.setState({'observedNodes': observedNodes});
          graphvis.removeMutatedGene(node);
    }

    setNodeState(node, option) {
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

    setActivePathway(pathway, session) {
      console.log("setActivePathway");
      let self=this;
        if (pathway.hasOwnProperty("pairwiseInteractions")) {
             graphvis.render(pathway.pairwiseInteractions)
             self.setState({ "activePathway": pathway,
                             "pairwiseInteractions": pathway.pairwiseInteractions,
                             "observedNodes": [],
                             "posteriorProbabilities": {}})
        }
        else {
            // var self = this;
            connection.session.call('pgmlab.pathway.get', [pathway.id]).then(
              function(res) {
                   var pairwiseInteractions = res;
                   graphvis.render(pairwiseInteractions)
                   self.setState({ "activePathway": pathway,
                                   "pairwiseInteractions": pairwiseInteractions,
                                   "observedNodes": [],
                                   "posteriorProbabilities": {}})
              },
              function (err) {
                  console.log("couldn't get pathway", pathway.id, err)
              })
         }
    }



    static guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
    uploadListAddFailure(name, filetype, comment) {
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
    addNewPathway(name, pairwiseInteractions) {
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
    addNewObservationSet(name, observations) {
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
    addNewEstimatedParameterSet(name, cpts) {
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
    addNewPosteriorProbabilitySet(name, probabilities) {
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
    componentDidMount () {
      // $('.modal-trigger').leanModal()
    }
    render () {
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

                    pathways                        = {this.props.pathways}
                    pairwiseInteractions            = {this.state.pairwiseInteractions}
                    observationSets                 = {this.state.observationSets}

                    selectPathways = {this.selectPathways}
                    removeSelectedPathways = {this.removeSelectedPathways}
                    selectedPathways = {this.state.selectedPathways}

                    selectObservationSet = {this.selectObservationSet}
                    selectedObservationSet = {this.state.selectedObservationSet}
                    selectObservations = {this.selectObservations}
                    removeSelectedObservations = {this.removeSelectedObservations}
                    selectedObservations = {this.state.selectedObservations}

                    setActiveObservation = {this.setActiveObservation}
                    activeObservation = {this.state.activeObservation}

                    activePathway                   = {this.state.activePathway}
                    setActivePathway                = {this.setActivePathway}

                    observeNode                     = {this.observeNode}
                    removeObservedNode              = {this.removeObservedNode}
                    runInference                    = {this.runInference}
                    setNodeState                    = {this.setNodeState} />
             <Footer />
          </div>
      )
    }
}

try {
   var autobahn = require('autobahn');
} catch (e) {
   console.log("e", e);
}

var wsuri = (document.location.origin == "file://")?
    "ws://127.0.0.1:9000/ws":
    (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});

function getPathway(session, pathways, activePathway) {
    session.call('pgmlab.pathway.get', [activePathway.id]).then(
          function(res) {
               var pairwiseInteractions = res;
               init(pathways, activePathway, pairwiseInteractions);
          },
          function (err) {
              console.log("couldn't get pathway", activePathway.id, err);
          });
}

connection.onopen = function (session, details) {
   console.log("Connected");
   session.call('pgmlab.pathways.list').then(
         function (res) {
           //Init pathway
            var pathways = res;
            var activePathway = pathways[0];
            //
            getPathway(session, pathways, activePathway);
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
   }
   if (t2) {
      clearInterval(t2);
      t2 = null;
   }
}

connection.open();

function init(pathways, activePathway, pairwiseInteractions) {
    render(<App pathways={pathways}
                activePathway={activePathway}
                pairwiseInteractions={pairwiseInteractions}  />, document.getElementById('app'));
}
