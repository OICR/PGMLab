import React from 'react'
import {render} from 'react-dom'

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import {App} from "./components/App.jsx"

var materialize = require('./lib/materialize.min.js')
var graphvis = require('./bin/graphvis.js');


try { var autobahn = require('autobahn'); }
catch (e) { console.log("e", e); };

var wsuri = (document.location.origin == "file://") ?
    "ws://127.0.0.1:9000/ws" :
    (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});

connection.onopen = function (session, details) {
   console.log("Connected");
   session.call('pgmlab.pathways.list').then(
         function (res) {
            //Init pathway
            const pathways = res;
            // const initPathway = pathways[0]; // This should correspond to the mock data in the App constructor
            // // console.log("connection.onopen:", res);
            //
            initializeApp(pathways);
            // getPairwiseInteraction(session, pathways, initPathway);
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

// function getPairwiseInteraction(session, pathways, initPathway) {
//   console.log("getPairwiseInteraction", initPathway);
//   session.call('pgmlab.pathway.get', [initPathway.id]).then(
//         res => {
//              const pairwiseInteractions = res;
//              console.log(res);
//              init(pathways, pairwiseInteractions);
//         },
//         err => console.log("couldn't get pathway", initPathway.id, err)
//       );
// };
function getReactomePathway(pathway) {
  return connection.session.call("pgmlab.pathway.get", [pathway.id]);
};

function initializeApp(reactomePathways) {
  // console.log("init:", pathways, pairwiseInteractions);
  render(
    <App reactomePathways={reactomePathways} getReactomePathway={getReactomePathway} />,
    document.getElementById('app')
  );
};
