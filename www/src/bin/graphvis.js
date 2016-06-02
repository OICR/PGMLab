import vis from "../lib/vis-4.14.0/dist/vis.js";

var network;
var datasetnodes;
var datasetedges;

// config
const config = {
  // For vis.network
  networkOptions: {
    height: "575px",
    width: "100%",
    clickToUse: true,
    interaction: {
      hideEdgesOnDrag: true,
      keyboard: false,
      navigationButtons: true,
      tooltipDelay: 50
    },
    layout: {
      randomSeed: undefined,
      improvedLayout:true,
      hierarchical: {
        enabled:true,
        levelSeparation: 175,
        nodeSpacing: 125,
        treeSpacing: 225,
        blockShifting: true,
        edgeMinimization: true,
        direction: "UD",
        sortMethod: "directed"
      }
    }
  },
  labelLengthLimit: 15,
  stateColors: { //Materialize colors
    1: "#D50000", //red accent-4
    2: "#424242", //grey darken-3
    3: "#43A047" //green darken-1
  }
}

const  drawPairwiseInteractions = (pairwiseInteractions, observedStates=new Map())=>{
  const edges = pairwiseInteractions.links.map(link=>{
    return {
      from: link.source,
      to: link.target,
      arrows: "to"
    };
  });
  const nodes = pairwiseInteractions.nodes.map(node=>{
    // Set node styling and properties
    const id = node.name;
    const label = (node.longname !== null ? (node.longname.length<config.labelLengthLimit):false) ? node.longname:node.name;
    const [borderWidth, border, background, highlight, hover] = observedStates.has(id) ?
      [
        2,
        config.stateColors[observedStates.get(id)],
        "#D2E5FF",
        {border: "#2B7CE9", background: "#D2E5FF"},
        {border: "#2B7CE9", background: "#D2E5FF"}
      ]:[
        1,
        "#2B7CE9",
        "#D2E5FF",
        {border: "#2B7CE9", background: "#D2E5FF"},
        {border: "#2B7CE9", background: "#D2E5FF"}
      ]
    const color = {border,background,highlight,hover};
    return {
      id, label,
      color,
      title: `
        ID: ${id}<br>
        Name: ${label}<br>
        Reactome Class: ${node.type!==null ? node.type:"unknown"}`,
      shape: "dot"
    };
  });
  return [nodes, edges];
};
const renderNetwork = (nodes, edges)=>{
  if (network===undefined) {
    datasetnodes = new vis.DataSet(nodes);
    datasetedges = new vis.DataSet(edges);
    network = new vis.Network(document.getElementById("canvas"),{
      nodes: datasetnodes,
      edges: datasetedges
    }, config.networkOptions);
  }
  else {

  }
};

// Initialize graphvis after <App> component mounts
function initialize(pairwiseInteractions, observedStates){
  console.log("graphvis.initialize");
  const [nodes, edges] = drawPairwiseInteractions(pairwiseInteractions, observedStates);
  renderNetwork(nodes, edges);
}
exports.initialize = initialize;

function render(pairwiseInteractions) {
  console.log("graphvis.render");
}
exports.render = render;

function setNodeState(node) {
  console.log("setNodeState");
  const stateColor={
    1:"red",
    2:"grey",
    3:"green"
  };
  // ["", "red", "grey", "green"];
  datasetnodes.update({
    id: node.name,
    color: {border: stateColor[node.state]},
    borderWidth: 3
  });
}
exports.setNodeState = setNodeState;

function addPosteriorProbabilities(posteriorProbabilities) {
    for (let ppid in posteriorProbabilities) {
      // console.log(ppid);
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

exports.focusNodes = function focusNodes(nodeIDs) {
  // const nodeID = node.name;
  // const focused = network.getSelectedNodes();
  // network.selectNodes(
  //   focused.includes(nodeID) ?
  //     focused.filter(id => id!==nodeID):
  //     focused.concat(nodeID), true);
  console.log(nodeIDs);
  network.selectNodes(nodeIDs, true);
}
exports.unfocusAll = ()=>{
  network.unselectAll();
}
exports.isFocused = (node)=>{
  const nodeID = node.name;
  return network !== undefined ? network.getSelectedNodes().includes(nodeID) : false;
}
