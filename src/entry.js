var main = require('./components/App.js');

try {
   var autobahn = require('autobahn');
} catch (e) {
   console.log("e", e);
}

var wsuri;
if (document.location.origin == "file://") {
   wsuri = "ws://127.0.0.1:9000/ws";

} else {
   wsuri = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//localhost:9000/ws";
}

// the WAMP connection to the Router
//
var connection = new autobahn.Connection({
   url: wsuri,
   realm: "realm1"
});

function getPathway(session, pathways, activePathway) {
    session.call('pgmlab.pathway.get', [activePathway.id]).then(
          function(res) {
               var pathway = res;
               console.log("pathway", pathway);
               main.init(pathways, activePathway, pathway);
          },
          function (err) {
              console.log("couldn't get pathway", id, err);
          });
}


// fired when connection is established and session attached
connection.onopen = function (session, details) {
   console.log("Connected");
   session.call('pgmlab.pathways.list').then(
         function (res) {
            var pathways = res;
            var activePathway = pathways[3];
            getPathway(session, pathways, activePathway);
         },
         function (err) {
            console.log("getPathwayList() error:", err);
         });
};


// fired when connection was lost (or could not be established)
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


// now actually open the connection
//
connection.open();
