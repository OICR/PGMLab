import React from "react";
import {render} from "react-dom";

import {compose, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./components/PGMBio/redux/reducer.jsx";
import {AppContainer} from "./components/PGMBio/App.jsx";

import {Map, List} from "immutable";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

require("../assets/css/materialize.css"); //dont need to import in pgmbio.html ?
require("../assets/css/style.css");
require("../node_modules/vis/dist/vis.css");
// require("./lib/kinetic-v5.1.0.min.js");

var $ = require("jquery");
window.jQuery = $;
window.$ = $;
var materialize = require('./lib/materialize.min.js')
var graphvis = require('./lib/graphvis.js');
var autobahn = require("autobahn");
var when = require("when");

const wsuri = (document.location.origin == "file://") ?
    "ws://127.0.0.1/ws" :
    (document.location.protocol === "http:" ? "wss:" : "wss:") + "//127.0.0.1:443/ws";
var connection = new autobahn.Connection({
  // url: wsuri,
  // url: "wss://127.0.0.1:4433",
  url: "ws://127.0.0.1:4433",
  realm: "realm1"
});
connection.onopen = function(session, details) {
  console.log("autobahn connected, loading WAMP RPC");
  // LOGIN
  // Return PGM user info (sub_uid, name, email) or null if could not validate
  const googleAuthenticate = (id_token, name, email) => session.call("google.auth", [], {id_token, name, email});
  // Get uploads, flatten ObjectID object and reduce into object of Immutable.Maps
  const getUploadsList = (id_token) => session.call("db.uploadslist", [], {id_token})
      .then(uploads =>
        JSON.parse(uploads)
          .map(u => {u._id = u._id.$oid; return Map(u)})
          .reduce((uploads, u) => uploads.set(u.get("_id"), u), Map())
      );
  // Get all user observations
  const getObservationsList = (id_token) => session.call("db.observationsList", [], {id_token})
    .then(observations =>
      JSON.parse(observations)
        .map(o => {o._id = o._id.$oid; o.data = List(o.data); return Map(o)})
        .reduce((observations, o) => observations.set(o.get("_id"), o), Map())
    );
  // Get all user pathways
  const getPathwaysList = (id_token) => session.call("db.pathwaysList", [], {id_token})
    .then(pathways =>
      JSON.parse(pathways)
          .map(p => {p._id = p._id.$oid; return Map(p)})
          .reduce((pathways, p) => pathways.set(p.get("_id"), p), Map())
    );
  const loginWithGoogle = (id_token, name, email) =>
    when.all([
      googleAuthenticate(id_token, name, email),
      getUploadsList(id_token),
      getObservationsList(id_token),
      getPathwaysList(id_token)
    ]);
  // REACTOME
  const getReactomePathwaysList = () => session.call("reactome.pathwayslist")
    .then(pathways => pathways
      .map(p => Map(p))
      // .reduce((pathways, p) => {pathways[p.get("id")] = p; return pathways}, {})
      .reduce((pathways, p) => pathways.set(p.get("id"), p), Map())
    );
  const getReactomePathway = (pathwayID) => session.call("reactome.pathway", [], {pathway_id: pathwayID});
  // PGM
  // Load WAMP with promise generators (WAMP RPC calls)
  const wamp = {
    loginWithGoogle,
    getReactomePathwaysList,
    getReactomePathway
  };
  initializeApp(wamp);
}
connection.onclose = function(reason, details) {
  console.log("autobahn close", reason, details);
}
connection.open();

function getReactomePathway(pathway) {
  return connection.session.call("reactome.pathway", [pathway.id]);
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

//
function initializeApp(wamp) {
  const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreDevTools(reducer);
  wamp.getReactomePathwaysList()
    .then(reactomePathways => {
        store.dispatch({
          type: "SET_INITIAL_STATE",
          payload: {
            reactomePathways
          }
        });
        render(
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Provider store={store}>
              <AppContainer
                wamp={wamp}
                    reactomePathways={reactomePathways}
                    getReactomePathway={getReactomePathway}
                    PGMLabInference={PGMLabInference}
                    callInchlibCluster={callInchlibCluster} />
            </Provider>
          </MuiThemeProvider>,
          document.getElementById('app')
        );
      })
};
