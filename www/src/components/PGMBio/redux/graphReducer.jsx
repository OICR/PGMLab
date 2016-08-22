import {Map} from "immutable"

const graphReducer = (state=Map(), action) => {
  switch (action.payload.graphVisType) {
    case "SELECT_PATHWAY":
      return state.setIn(["graphVis", "viewPathway"], action.payload.pathwayID)
    case "SELECT_OBSERVATION":
      return state.setIn(["graphVis", "viewObservation"], action.payload.obsIndex)
  }
  return state;
}

export default graphReducer
