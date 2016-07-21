import React from "react";
import {render} from "react-dom";
import {Map} from "immutable";
import {compose, createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./components/PGMLab/redux/reducer.jsx";
import {AppContainer} from "./components/PGMLab/App.jsx"

var injectTapEvenPlugin = require("react-tap-event-plugin");
injectTapEvenPlugin();

require("../assets/css/materialize.css");
require("../assets/css/style.css");
require("material-design-icons");
var $ = require("jquery");
window.jQuery = $;
window.$ = $;
var materialize = require("./lib/materialize.min.js");

// AUTOBAHN
try {var autobahn = require("autobahn")}
catch (err) {console.log("autobahn error: ", e)};
const wsuri = (document.location.origin == "file://") ?
  "wss://127.0.0.1/ws" :
  // (document.location.protocol === "http:" ? "ws:" : "wss:") + "//127.0.0.1/ws";
  (document.location.protocol === "http:" ? "wss:" : "wss:") + "//127.0.0.1/ws";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});
connection.onopen = function(session, details) {
  console.log("...autobahn connected");
  initializeApp(session);
}
connection.open()

function initializeApp(wamp){
  const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreDevTools(reducer);
  store.dispatch({
    type: "SET_INITIAL_STATE",
    wamp
  });
  render(
    <Provider store={store}>
      <AppContainer/>
    </Provider>,
    document.getElementById('app')
  );
}
