import {Map} from "immutable"
import GraphVis from "./GraphVis.jsx"

var GV = null

function initializeGV(state, action) {
  const {canvasElement} = action.payload
  const nodes = GraphVis.getNodes(
    state.getIn(["dataspace", "pathways", state.getIn(["graphVis", "viewPathway"]), "data"])
  )
  const edges = GraphVis.getEdges(
    state.getIn(["dataspace", "pathways", state.getIn(["graphVis", "viewPathway"]), "data"])
  )
  GV = new GraphVis(canvasElement, nodes, edges)
  return state
}

function drawGV(){

}

const graphReducer = (state=Map(), action) => {
  switch (action.payload.graphVisType) {
    case "INITIALIZATION":
      return initializeGV(state, action)
    case "SELECT_PATHWAY":
      return state.setIn(["graphVis", "viewPathway"], action.payload.pathwayID)
    case "SELECT_OBSERVATION":
      return state.setIn(["graphVis", "viewObservation"], action.payload.obsIndex)
  }
  return state;
}

export default graphReducer
