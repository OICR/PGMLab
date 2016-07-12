import React from "react";
import { render } from "react-dom";

require("../assets/css/materialize.css");
require("../assets/css/style.css");
require("material-design-icons");
var $ = require("jquery");
window.jQuery = $;
window.$ = $;
var materialize = require("./lib/materialize.min.js");

import {App} from "./components/PGMLab/App.jsx";

try {var autobahn = require("autobahn")}
catch (err) {console.log("autobahn error: ", e)};

const wsuri = (document.location.origin == "file://") ?
  "wss://127.0.0.1/ws" :
  // (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9001/ws";
  // (document.location.protocol === "http:" ? "ws:" : "wss:") + "//"+document.location.host+"/ws";
  (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost/ws";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});
connection.onopen = function(session, details) {
  console.log("autobahn connected", session);
  initializeApp(session);
}
connection.open()

function initializeApp(session){
  render(
    <App session={session}/>,
    document.getElementById('app')
  );
}
