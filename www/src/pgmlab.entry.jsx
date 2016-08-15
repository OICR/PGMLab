import React from "react";
import {render} from "react-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
const wssuri = "wss://127.0.0.1:443";
const wsuri = "ws://127.0.0.1:4433";
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
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
  );
}
