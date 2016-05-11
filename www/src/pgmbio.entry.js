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

class App extends  React.Component {
    constructor (props) {
      super(props)
      var observationSets =  [{ "id":   1,
                                "name": "One",
                                "observations": []
                              }]

      this.state = { "pathways"                         : this.props.pathways,
                      "activePathway"                   : this.props.activePathway,
                      "uploadList"                      : [],
                      "selectedPathwaysLearning"        : [],
                      "selectedPathwaysInference"       : [],
                      "observationSets"                 : observationSets,
                      "selectedObservationSetLearning"  : 0,  // this index of the observationSet array
                      "selectedObservationSetInference" : 0,  // ''
                      "selectedObservationLearning"     : 0,  // this index of the observationSet array
                      "selectedObservationInference"    : 0,  // ''
                      "posteriorProbabilitySets"        : [],
                      "estimatedParameterSets"          : [],
                      "pairwiseInteractions"            : this.props.pairwiseInteractions}

      this.addNewPathway                  = this.addNewPathway.bind(this)
      this.setActivePathway               = this.setActivePathway.bind(this)
      this.observeNode                    = this.observeNode.bind(this)
      this.removeObservedNode             = this.removeObservedNode.bind(this)
      this.runInference                   = this.runInference.bind(this)
      this.setNodeState                   = this.setNodeState.bind(this)
      this.removeSelectedPathwayLearning  = this.removeSelectedPathwayLearning.bind(this)
      this.selectPathwayLearning          = this.selectPathwayLearning.bind(this)
      this.removeSelectedPathwayInference = this.removeSelectedPathwayInference.bind(this)
      this.selectPathwayInference         = this.selectPathwayInference.bind(this)
      this.selectObservationSetLearning   = this.selectObservationSetLearning.bind(this)
      this.selectObservationSetInference  = this.selectObservationSetInference.bind(this)
      this.selectObservationLearning      = this.selectObservationLearning.bind(this)
      this.selectObservationInference     = this.selectObservationInference.bind(this)
      this.uploadListAddFailure           = this.uploadListAddFailure.bind(this)
      this.addNewObservationSet           = this.addNewObservationSet.bind(this)
      this.addNewEstimatedParameterSet    = this.addNewEstimatedParameterSet.bind(this)
      this.addNewPosteriorProbabilitySet  = this.addNewPosteriorProbabilitySet.bind(this)
    }

    static getCurrentDateTime() {
        return moment().format('MMM D, YYYY HH:mm')
    }

    removeSelectedPathwayInference(pathwayID) {
        let pathwayIDs = this.state.selectedPathwaysInference
        let indexOfPathwayID = (pathwayIDs.length === 0)? -1:  pathwayIDs.indexOf(pathwayID)
        if ( indexOfPathwayID !== -1) {
          pathwayIDs.splice(indexOfPathwayID)
          this.setState({"selectedPathwaysInference": pathwayIDs})
        }
    }

    selectPathwayInference(pathwayID) {
        let pathwayIDs = this.state.selectedPathwaysInference
        let indexOfPathwayID = (pathwayIDs.length === 0)? -1: pathwayIDs.indexOf(pathwayID)
        if (indexOfPathwayID === -1) {
          pathwayIDs.push(pathwayID)
          this.setState({"selectedPathwaysInference": pathwayIDs})
        }
    }

    removeSelectedPathwayLearning(pathwayID) {
        let pathwayIDs = this.state.selectedPathwaysLearning
        let indexOfPathwayID = (pathwayIDs.length === 0)? -1: pathwayIDs.indexOf(pathwayID)
        if ( indexOfPathwayID !== -1) {
          pathwayIDs.splice(indexOfPathwayID)
          this.setState({"selectedPathwaysLearning": pathwayIDs})
        }
    }

    selectPathwayLearning(pathwayID) {
        let pathwayIDs = this.state.selectedPathwaysLearning
        let indexOfPathwayID = (pathwayIDs.length === 0)? -1: pathwayIDs.indexOf(pathwayID)
        if (indexOfPathwayID === -1) {
          pathwayIDs.push(pathwayID)
          this.setState({"selectedPathwaysLearning": pathwayIDs})
        }
    }

    runInference() {
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
          var observedNodes = $.grep(this.state.observedNodes, function(e){
              return e.name != node.name;
          });
          this.setState({'observedNodes': observedNodes});
          graphvis.removeMutatedGene(node);
    }

    setNodeState(node, option) {
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
        if (pathway.hasOwnProperty("pairwiseInteractions")) {
             graphvis.render(pathway.pairwiseInteractions)
             this.setState({ "activePathway": pathway,
                             "pairwiseInteractions": pathway.pairwiseInteractions,
                             "observedNodes": [],
                             "posteriorProbabilities": {}})
        }
        else {
            var self = this;
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

    uploadListAddFailure(name, filetype, comment) {
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

    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }

    addNewPathway(name, pairwiseInteractions) {
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
                        "uploadList"             : uploadList })
    }

    addNewObservationSet(name, observations) {
        var guid = App.guid()

        var uploadSummary = { "datetime": App.getCurrentDateTime(),
                              "id"      : guid,
                              "filetype": "Observation",
                              "success" : true,
                              "name"    : name,
                              "comment" : ""}

        var uploadList = this.state.uploadList
        uploadList.push(uploadSummary)

        var observationSet ={ "id"           : guid,
                              "name"         : name,
                              "activeIndex"  : 0,
                              "observations" : observations}

        var observationSets = this.state.observationSets
        observationSets.push(observationSet)

        console.log("observationSets", observationSets)
        this.setState({"uploadList"      : uploadList,
                       "observationSets" : observationSets})

    }

    addNewEstimatedParameterSet(name, cpts) {
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

    selectObservationSetInference(index) {
        var observationIndex = 0
        var nodes = this.state.observationSets[index].observations[observationIndex]

        graphvis.render(this.state.pairwiseInteractions)

        for(let i = 0; i < nodes.length; i++) {
              graphvis.setNodeState(nodes[i])
        }

        this.setState({"selectedObservationSetInference": index,
                       "selectedObservationInference"   : observationIndex})
    }

    selectObservationSetLearning(index) {
        var observationIndex = 0
        var nodes = this.state.observationSets[index].observations[observationIndex]
        console.log("selectingObsSet")
        graphvis.render(this.state.pairwiseInteractions)

        for(let i = 0; i < nodes.length; i++) {
              graphvis.setNodeState(nodes[i])
        }

        this.setState({"selectedObservationSetLearning" : index,
                       "selectedObservationLearning"    : observationIndex })
    }

    selectObservationInference(index) {
        var nodes = this.state.observationSets[this.state.selectedObservationSetInference].observations[index]

        graphvis.render(this.state.pairwiseInteractions)

        for(let i = 0; i < nodes.length; i++) {
              graphvis.setNodeState(nodes[i])
        }

        console.log("selectingObservtion Inf", index)
        this.setState({"selectedObservationInference": index})
    }

    selectObservationLearning(index) {
        this.setState({"selectedObservationLearning": index})
    }

    componentDidMount () {
      $('.modal-trigger').leanModal()
    }

    render () {
       console.log("Rendering App: ", this)
        return (
            <div>
                <Header />
                <Body pathways                        = {this.props.pathways}
                      uploadList                      = {this.state.uploadList}
                      uploadListAddFailure            = {this.uploadListAddFailure}
                      activePathway                   = {this.state.activePathway}
                      setActivePathway                = {this.setActivePathway}
                      removeSelectedPathwayLearning   = {this.removeSelectedPathwayLearning}
                      removeSelectedPathwayInference  = {this.removeSelectedPathwayInference}
                      selectPathwayLearning           = {this.selectPathwayLearning}
                      selectedPathwaysLearning        = {this.state.selectedPathwaysLearning}
                      selectPathwayInference          = {this.selectPathwayInference}
                      selectedPathwaysInference       = {this.state.selectedPathwaysInference}
                      observeNode                     = {this.observeNode}
                      removeObservedNode              = {this.removeObservedNode}
                      selectedObservationSetLearning  = {this.state.selectedObservationSetLearning}
                      selectedObservationSetInference = {this.state.selectedObservationSetInference}
                      observationSets                 = {this.state.observationSets}
                      runInference                    = {this.runInference}
                      setNodeState                    = {this.setNodeState}
                      selectObservationSetLearning    = {this.selectObservationSetLearning}
                      selectObservationSetInference   = {this.selectObservationSetInference}
                      selectObservationInference      = {this.selectObservationInference}
                      selectObservationLearning       = {this.selectObservationLearning}
                      selectedObservationInference    = {this.state.selectedObservationInference}
                      selectedObservationLearning     = {this.state.selectedObservationLearning}
                      addNewPathway                   = {this.addNewPathway}
                      addNewObservationSet            = {this.addNewObservationSet}
                      addNewEstimatedParameterSet     = {this.addNewEstimatedParameterSet}
                      addNewPosteriorProbabilitySet   = {this.addNewPosteriorProbabilitySet}
                      pairwiseInteractions            = {this.state.pairwiseInteractions} />
               <Footer />
            </div> )
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
              console.log("couldn't get pathway", id, err);
          });
}

connection.onopen = function (session, details) {
   console.log("Connected");
   session.call('pgmlab.pathways.list').then(
         function (res) {
            var pathways = res;
            var activePathway = pathways[0];
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
