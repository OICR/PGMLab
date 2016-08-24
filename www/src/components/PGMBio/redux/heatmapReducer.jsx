import {Map, fromJS} from "immutable"

function addResult(state, action) {
  return state.withMutations(state => state
    .setIn(["results", action.payload.result.runID], fromJS(action.payload.result))
  )
}

const heatmapReducer = (state=Map(), action) => {
  switch (action.payload.heatmapType) {
    case "INFERENCE_SUCCESS":
      return addResult(state, action)
    case "SELECT_RESULT":
      return state.withMutations(state => state
        .updateIn(["heatmap","viewResult"], resultID => action.payload.runID)
        .setIn(["heatmap","viewPathway"], "")
        .setIn(["heatmap","viewState"], "")
        .setIn(["heatmap","data","inchlib"], state.getIn(["results",action.payload.runID,"inchlib"]))
        .setIn(
          ["heatmap","data","pathways"],
          state.getIn(["results",action.payload.runID,"pathways"])
            .map((p,id) => p.get("name", p.get("filename")))
        )
      )
    case "SELECT_PATHWAY":
      return state.withMutations(state => state
        .updateIn(["heatmap","viewPathway"], viewPathway => action.payload.pathwayID)
      )
    case "SELECT_STATE":
      return state.withMutations(state => state
        .updateIn(["heatmap","viewState"], viewState => action.payload.state)
      )
  }
  return state
}

export default heatmapReducer
