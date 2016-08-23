import vis from "vis"
import {List, Map} from "immutable"

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
import {red500, blue500, green500, grey900, blueGrey500, grey300} from "material-ui/styles/colors"

export default class GraphVis {
  static getStateColors() {
    return Map({
      unobserved: grey900,
      "1": red500,
      "2": blue500,
      "3": green500
    })
  }
  static initializeGVNetwork(canvasElement, nodes, edges){
    return new vis.Network(
      canvasElement,
      {nodes,edges},
      networkOptions
    )
  }

  static getNodes(dataspace, graphVis){
    const nodes = dataspace.getIn(["pathways", graphVis.get("viewPathway"), "data", "nodes"])
    const getNodeBorder = state => {
      switch (state) {
        case "unobserved": return grey900
        case "1": return red500
        case "2": return blue500
        case "3": return green500
      }
    }
    const visNode = node => {
      const id = name = node.get("name")
      const longname = node.get("longname")
      const label = longname!=null ? (longname.length>15 ? name : longname) : name
      const nodeState = dataspace.getIn(["observationSet","data",graphVis.get("viewObservation"),name,"state"], "unobserved")
      const color = {
        border: getNodeBorder(nodeState),
        background: grey300,
        highlight: {border: blueGrey500, background: grey300}
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
    network.setData({nodes, edges})
  }
}
