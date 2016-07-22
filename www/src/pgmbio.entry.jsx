import React from "react";
import {render} from "react-dom";

import {compose, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./components/PGMBio/redux/reducer.jsx";
import {AppContainer} from "./components/PGMBio/App.jsx";
import {App2 as App} from "./components/PGMBio/App.jsx"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();



var materialize = require('./lib/materialize.min.js')
var graphvis = require('./lib/graphvis.js');

try { var autobahn = require('autobahn'); }
catch (err) { console.log("autobahn error: ", e); };

const wsuri = (document.location.origin == "file://") ?
    "ws://127.0.0.1:9000/ws" :
    (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});
connection.onopen = function(session, details) {
  console.log("autobahn connected");
  session
    .call("reactome.pathwaylist.get")
    .then(
       reactomePathways => initializeApp(reactomePathways),
       err => console.log("getPathwayList() error:", err)
     );
}
connection.open();

function getReactomePathway(pathway) {
  return connection.session.call("reactome.pathway.get", [pathway.id]);
};
// Nodes returned will only be for given pathway described by links
//  when passing this processed info to callInChlibCluster, extraneous observed nodes will be ignored
function PGMLabInference(links, observationSet, pathways) {
  const options = {submitDateTime: App.getCurrentDateTime()}; //Don't give extra info
  return connection.session.call("pgmlab.inference.run", [links, observationSet, pathways, options]);
}
function callInchlibCluster(posteriorProbsData) {
  return connection.session.call("inchlib.cluster", [posteriorProbsData]);
}

function initializeApp(reactomePathways) {
  const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreDevTools(reducer);
  render(
    <Provider store={store}>
      <AppContainer
            reactomePathways={reactomePathways}
            getReactomePathway={getReactomePathway}
            PGMLabInference={PGMLabInference}
            callInchlibCluster={callInchlibCluster} />
    </Provider>,
    document.getElementById('app')
  );
};
