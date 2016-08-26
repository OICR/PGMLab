import {Map} from "immutable"

function changeGraphPathway(state, action) {
  return state.setIn(["graphVis", "viewPathway"], action.payload.pathwayID)
}

function changeGraphObservation(state, action) {
  return state.withMutations(state => state
    .setIn(["graphVis", "viewObservation"], action.payload.obsIndex)
    .setIn(["graphVis", "viewObservationSet"], state.getIn(["dataspace","observationSet","_id"]))
  )
}

const graphReducer = (state=Map(), action) => {
  switch (action.payload.graphVisType) {
    case "SELECT_PATHWAY":
      return changeGraphPathway(state, action)
    case "SELECT_OBSERVATION":
      return changeGraphObservation(state, action)
  }
  return state
}

export default graphReducer
