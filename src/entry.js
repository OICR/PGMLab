var materialize = require('./lib/materialize.min.js');

import React from 'react';
import { render } from 'react-dom';

var observations_learning = [{id:"ol1", name:'one'},{id:"ol2", name:'two'},{id:"ol3", name:'three'}];
var observations_inference = [{id:"oi1", name:'one'},{id:"oi2", name:'two'},{id:"oi3", name:'three'}];

import {Header} from './components/Header.jsx';
import {Main}   from './components/Main.jsx';
import {Footer} from './components/Footer.jsx';

var graphvis = require('./bin/graphvis.js');

class App extends  React.Component {
    constructor (props) {
        super(props);
        
        this.state = ({ activePathway:          this.props.activePathway,
                        mutatedGenes:           [],
                        posteriorProbabilities: {},
                        pairwiseInteractions:   this.props.pairwiseInteractions});                       

        this.setActivePathway = this.setActivePathway.bind(this);
        this.mutateGene = this.mutateGene.bind(this);
        this.removeMutatedGene = this.removeMutatedGene.bind(this);
        this.runInference = this.runInference.bind(this);
    }
    runInference() {
        console.log("running Inference", this.props.pairwiseInteractions.links, this.state.mutatedGenes);
        var self = this;

        connection.session.call('pgmlab.inference.run', [self.props.pairwiseInteractions.links, self.state.mutatedGenes, []]).then(
          function(response) {
               console.log("response", response)
               self.setState({"posteriorProbabilities": response["posteriorProbabilities"]})
               graphvis.addPosteriorProbabilities(self.state.posteriorProbabilities);
          },
          function (err) {
              console.log("couldn't run inference", err);
          });

    }
    mutateGene(gene) {
        var found = this.state.mutatedGenes.some(function (el) { return el.name === gene.name  })
        if (!found) {
            gene["state"] = 0;
            var newgenelist = this.state.mutatedGenes.concat([gene])

            this.setState({mutatedGenes: newgenelist});
            graphvis.mutateGene(gene);
        }
    }
    removeMutatedGene(gene) {
          var mutatedGenes = $.grep(this.state.mutatedGenes, function(e){ 
              return e.name != gene.name; 
          });
          this.setState({mutatedGenes: mutatedGenes});
          graphvis.removeMutatedGene(gene);
    }
    setActivePathway(pathway, session) {
        console.log("prod connection", connection);
        var self = this;
        connection.session.call('pgmlab.pathway.get', [pathway.id]).then(
          function(res) {
               self.setState({ activePathway: pathway,
                               pairwiseInteractions: res,
                               mutatedGenes: [],
                               posteriorProbabilities: {}});
              console.log("state", self.state);
              var graphData = graphvis.render(res);
              console.log("returned data", graphData);
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
                      mutateGene           = {this.mutateGene}
                      removeMutatedGene    = {this.removeMutatedGene}
                      mutatedGenes         = {this.state.mutatedGenes}
                      runInference         = {this.runInference}
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
