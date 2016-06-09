import React from 'react'
import {render} from 'react-dom'

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import {App} from "./components/App.jsx"

var materialize = require('./lib/materialize.min.js')
var graphvis = require('./bin/graphvis.js');

try { var autobahn = require('autobahn'); }
catch (err) { console.log("autobahn error: ", e); };

// var wsuri = (document.location.origin == "file://") ?
//     "ws://127.0.0.1:9000/ws" :
//     (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";
// var connection = new autobahn.Connection({
//     url: wsuri,
//     realm: "realm1"
// });

// connection.onopen = (session, details) => {
//    console.log("Connected");
//    session.call('pgmlab.pathways.list').then(
//          reactomePathways => initializeApp(reactomePathways),
//          err => console.log("getPathwayList() error:", err)
//        );
// };
// connection.onclose = (reason, details) => {
//    console.log("Connection lost: " + reason);
//    if (t1) { clearInterval(t1); t1 = null; };
//    if (t2) { clearInterval(t2); t2 = null; };
// };
// connection.open();

const wsuri = (document.location.origin == "file://") ?
    "ws://127.0.0.1:9000/ws" :
    (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";
var connection = new autobahn.Connection({
  url:decodeURI (wsuri),
  realm:decodeURI("realm1")
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
  return connection.session.call("reactome.inference.run", [links, observationSet, pathways, options]);
}
function callInCHlibCluster(posteriorProbsData) {
  return connection.session.call("inchlib.cluster", [posteriorProbsData]);
}

function initializeApp(reactomePathways) {
  render(
    <App  reactomePathways={reactomePathways}
          getReactomePathway={getReactomePathway}
          PGMLabInference={PGMLabInference}
          callInCHlibCluster={callInCHlibCluster}/>,
    document.getElementById('app')
  );
};
