import vis from "vis"

const networkOptions = {
  height: "575px",
  width: "100%",
  clickToUse: true,
  interaction: {
    hideEdgesOnDrag: true,
    keyboard: false,
    multiselect: true,
    navigationButtons: true,
    tooltipDelay: 50
  },
  layout: {
    improvedLayout: true,
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
  },
  nodes: {
    borderWidth: 3
  },
  physics: {
    enabled: true,
    maxVelocity: 50,
    minVelocity: 1,
    stabilization: {
      enabled: true,
      iterations: 5000,
      fit: true
    },
    timestep: 1,
    adaptiveTimestep: true
  }
}
const labelLengthLimit = 15
const stateColors = { //Materialize colors
  '-': "#2B7CE9", //default
  '1': "#D50000", //red accent-4
  '2': "#424242", //grey darken-3
  '3': "#43A047" //green darken-1
}
const config = {
  networkOptions,
  labelLengthLimit,
  stateColors
}

let datasetNodes = new vis.DataSet()
let datasetEdges = new vis.DataSet()
let network = new vis.Network(
  document.getElementById("graphCanvas"),
  {
    nodes: datasetNodes,
    edges: datasetEdges
  },
  networkOptions
)

const getEdges = pathway => {
  return pathway.getIn(["data", "links"])
    .map(link => {
      return {
        from: link.get("source"),
        to: link.get("target"),
        arrows: "to"
      }
    })
}
const getNodes = (pathway, observationSet) => {
  return pathway.getIn(["data", "nodes"])
    .map(node => {
      const id = node.get("name")
      const label = node.get("name")
      const border = 
    })
}
