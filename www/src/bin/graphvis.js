import vis from "../lib/vis-4.14.0/dist/vis.js";

var network;
var datasetnodes;
var datasetedges;

function render(pairwiseInteractions) {
    const edges = pairwiseInteractions.links.map(link=>{
      return {
        from: link.source,
        to: link.target,
        arrows: "to"
      };
    });

    const lengthLimit = 15;
    const nodes = pairwiseInteractions.nodes.map(node=>{
      const id = node.name;
      const label = (node.longname !== null ? node.longname.length < lengthLimit : false)  ? node.longname : node.name;
      const reactomeClass = node.type !== null ? node.type : "unknown";
      return {
        id, label,
        color: {
          background: "#FFFFFF",
          border: "#000000"
        },
        title: `ID: ${id}<br>Name: ${label}<br>Reactome Class: ${reactomeClass}`,
        shape: "dot",
        scaling: {label: {enabled: false}}
      };
    });

    const container = document.getElementById("chart");
    datasetedges = new vis.DataSet(edges);
    datasetnodes = new vis.DataSet(nodes);

    const data = {
        nodes: datasetnodes,
        edges: datasetedges
    };

    const options = {
      // height: "800px",
      height: "100%",
      width: "100%",
      interaction: {
        navigationButtons: true,
        keyboard: true,
        tooltipDelay: 200,
        hideEdgesOnDrag: true
      },
      layout: {
        randomSeed: undefined,
        improvedLayout:true,
        hierarchical: {
          enabled:true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          direction: "UD",        // UD, DU, LR, RL
          sortMethod: "directed"   // hubsize, directed
        }
      }
    };

    switch (network === undefined) {
      case true: network = new vis.Network(container,data,options); break;
      case false: network.setData(data); break;
    };

        // subscribe to any change in the DataSet
  /*      datasetnodes.on('*', function (event, properties, senderId) {
           console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
        });
        datasetedges.on('*', function (event, properties, senderId) {
           console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
        });*/


/*
        network.on( 'doubleClick', function(properties) {
            var nodes = datasetnodes.get(properties.nodes);
            var node = nodes[0];
            console.log("nodes", nodes, node);
            node["state"] = 0;
            setNodeState(node);
            console.log('double clicked node ' + properties.nodes, node);
        });
*/
}
exports.render = render;

function setNodeState(node) {
  const stateColor=["", "red", "grey", "green"];
  datasetnodes.update({
    id: node.name,
    color: {border: stateColor[node.state]},
    borderWidth: 3
  });
}
exports.setNodeState = setNodeState;

function removeMutatedGene(node) {
  datasetnodes.update({
    id: node.name,
    color: {border: "black"},
    borderWidth: 1
  });
}
exports.removeMutatedGene = removeMutatedGene;

function addPosteriorProbabilities(posteriorProbabilities) {
    for (let ppid in posteriorProbabilities) {
        const stateProbs = posteriorProbabilities[ppid];

        // why is it not rgb?
        let [r, b, g] = stateProbs.map(probability=>Math.ceil(probability*255));
        let dominantState;
        // This makes it so that we just pick to dominant state and have the color based on that state. Where state 1 is grey (all colors equal)
        if ((r > g) &&(r > b)) {
             g = 0;
             b = 0;
             dominantState = 1;
        }
        else if ((g> r) && (g> b)) {
             r = 0;
             b = 0;
             dominantState = 3;
        }
        else {
             b = 255 - b;
             g = b;
             r =  b;
             dominantState = 2;
        };

        let node = datasetnodes.get(ppid);
        let title = node["title"].split("<br>Probabilities:<br>")[0];
        title += "<br>Probabilities:<br>" +
                 "Dominant State: " + dominantState + "<br>" +
                 "State 1 (down regulated): " + stateProbs[0] + "<br>" +
                 "State 2 (no change):      " + stateProbs[1] + "<br>" +
                 "State 3 (up regulated):   " + stateProbs[2] + "<br>" +
                 " r " + r + " g "+ g + " b " + g;

        const bgColor =  "rgba(" + r + "," + g + "," + b + ",.5)";

        datasetnodes.update({
          id: ppid,
          color: {background: bgColor},
          title: title
        });
    }
}
exports.addPosteriorProbabilities = addPosteriorProbabilities;
