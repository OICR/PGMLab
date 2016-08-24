import {Map, fromJS} from "immutable"

function addResult(state, action) {
  return state.withMutations(state => state
    .setIn(["results", action.payload.result.runID], fromJS(action.payload.result))
  )
}

const heatmapReducer = (state=Map(), action) => {
  switch (action.payload.heatType) {
    case "INFERENCE_SUCCESS":
      return addResult(state, action)
  }
  return state
}

export default heatmapReducer
