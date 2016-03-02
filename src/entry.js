var materialize = require('./lib/materialize.min.js')

import React from 'react'
import { render } from 'react-dom'

import {Header} from './components/Header.jsx';
import {Main}   from './components/Main.jsx';
import {Footer} from './components/Footer.jsx';

var graphvis = require('./bin/graphvis.js');

class App extends  React.Component {
    constructor (props) {
        super(props);
        
        this.state = ({ activePathway:          this.props.activePathway,
                        observedNodes:          [],
                        posteriorProbabilities: {},
                        pairwiseInteractions:   this.props.pairwiseInteractions});                       

        this.setActivePathway = this.setActivePathway.bind(this);
        this.observeNode = this.observeNode.bind(this);
        this.removeObservedNode = this.removeObservedNode.bind(this);
        this.runInference = this.runInference.bind(this);
        this.setNodeState = this.setNodeState.bind(this);
    }
    runInference() {
        console.log("running Inference", this.props.pairwiseInteractions.links, this.state.observedNodes);
        var self = this;

        connection.session.call('pgmlab.inference.run', [self.props.pairwiseInteractions.links, self.state.observedNodes, []]).then(
          function(response) {
               console.log("response", response)
               self.setState({"posteriorProbabilities": response["posteriorProbabilities"]})
               graphvis.addPosteriorProbabilities(self.state.posteriorProbabilities);
          },
          function (err) {
              console.log("couldn't run inference", err);
          });

    }
    observeNode(node) {
        var found = this.state.observedNodes.some(function (el) { return el.name === node.name  })
        if (!found) {
            node["state"] = 0;
            graphvis.setNodeState(node);

            var newNodeList = this.state.observedNodes.concat([node])
            this.setState({observedNodes: newNodeList});
        }
    }
    removeObservedNode(node) {
          var observedNodes = $.grep(this.state.observedNodes, function(e){ 
              return e.name != node.name; 
          });
          this.setState({'observedNodes': observedNodes});
          graphvis.removeMutatedGene(node);
    }
    setNodeState(node, state) {
        console.log("inside", state, node, this.state.observedNodes)
        var observedNodes = this.state.observedNodes
        for (var i = 0; i < observedNodes.length; i++) {
            var parent = observedNodes[i];
            if (parent.id === node.id) {
                parent.state = state.value
            }
        }

        node["state"] = state.value

        console.log("setnodestate", node)
        graphvis.setNodeState(node)
        this.setState({"observedNodes": observedNodes});
    }
    setActivePathway(pathway, session) {
        console.log("prod connection", connection);
        var self = this;
        connection.session.call('pgmlab.pathway.get', [pathway.id]).then(
          function(res) {
               self.setState({ activePathway: pathway,
                               pairwiseInteractions: res,
                               observedNodes: [],
                               posteriorProbabilities: {}});
              var graphData = graphvis.render(res);
              self.setState({"graphData": graphData});
          },
          function (err) {
              console.log("couldn't get pathway", pathway.id, err);
          });

        console.log("Entry: setting active pathway");
    }
    componentDidMount () {
      $('#side-nav-open').click(() => {
          $('.side-nav').toggleClass('open')
      });
      $('#side-nav-close').click(() => {
          $('.side-nav').toggleClass('open')
      });
    }
    render () {
        return (
            <div>
                <Header pathways={this.props.pathways}
                        activePathway={this.state.activePathway}
                        setActivePathway={this.setActivePathway} />
                <Main pathways             = {this.props.pathways}
                      activePathway        = {this.state.activePathway}
                      setActivePathway     = {this.setActivePathway}
                      observeNode          = {this.observeNode}
                      removeObservedNode   = {this.removeObservedNode}
                      observedNodes        = {this.state.observedNodes}
                      runInference         = {this.runInference}
                      setNodeState         = {this.setNodeState}
                      pairwiseInteractions = {this.state.pairwiseInteractions} />
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

function changePathway(pathayID) {
};

connection.open();

function init(pathways, activePathway, pairwiseInteractions) {
    render(<App pathways={pathways} 
                activePathway={activePathway}
                pairwiseInteractions={pairwiseInteractions}  />, document.getElementById('app'));
}
