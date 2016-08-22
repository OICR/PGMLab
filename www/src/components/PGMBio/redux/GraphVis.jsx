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

export default class GraphVis {
  static initializeGVNetwork(canvasElement, nodes, edges){
    return new vis.Network(
      canvasElement,
      {nodes,edges},
      networkOptions
    )
  }

  static getNodes(dataspace, graphVis){
    const nodes = dataspace.getIn(["pathways", graphVis.get("viewPathway"), "data", "nodes"])
    const visNode = node => {
      const id = node.get("name")
      const label = node.get("name")
      const border = "#2B7CE9"
      const color = {
        border,
        background: "#D2E5FF",
        highlight: {border: "#2B7CE9", background: "#D2E5FF"},
        hover: {border: "#2B7CE9", background: "#D2E5FF"}
      }
      return {
        id, label, color,
        title: `
          ID: ${id}<br>
          Name: ${label}<br>`,
        shape: "dot"
      }
    }
    return new vis.DataSet(nodes.map(visNode).toJS())
  }

  static getEdges(dataspace, graphVis){
    const links = dataspace.getIn(["pathways", graphVis.get("viewPathway"), "data", "links"])
    const visEdge = link => {
      return {
        from: link.get("source"),
        to: link.get("target"),
        arrows: "to"
      }
    }
    return new vis.DataSet(links.map(visEdge).toJS())
  }

  static drawNetwork(network, nodes, edges){
    network.setData(nodes, edges)
  }
}
