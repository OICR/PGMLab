import React from "react";
import {render} from "react-dom";

import {compose, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./components/PGMBio/redux/reducer.jsx";
import {AppContainer} from "./components/PGMBio/App.jsx";

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
var autobahn = require('autobahn');

const wsuri = (document.location.origin == "file://") ?
    "ws://127.0.0.1/ws" :
    (document.location.protocol === "http:" ? "wss:" : "wss:") + "//127.0.0.1:443/ws";
var connection = new autobahn.Connection({
  // url: wsuri,
  // url: "ws://127.0.0.1:8000/ws",
  url: "ws://127.0.0.1:4433",
  realm: "realm1"
});
connection.onopen = function(session, details) {
  console.log("autobahn connected", session);
  // session
  //   .call("reactome.pathwaylist.get")
  //   .then(
  //      reactomePathways => initializeApp(reactomePathways),
  //      err => console.log("getPathwayList() error:", err)
  //    );
  initializeApp(session);

}
connection.onclose = function(reason, details) {
  console.log("autobahn close", reason, details);
}
connection.open();

function getReactomePathwayList(){
  return connection.session.call("reactome.pathways")
}

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

function initializeApp(wamp) {
  const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreDevTools(reducer);
  getReactomePathwayList()
    .then(reactomePathways =>
      {
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
