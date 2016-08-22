import {Map} from "immutable"

import authenticationReducer from "./authenticationReducer.jsx"
import uploadReducer from "./uploadReducer.jsx"
import runViewSelectReducer from "./runViewSelectReducer.jsx"
import graphReducer from "./graphReducer.jsx"

function changeView(state, action){
  return state.update("view", view => action.payload.view)
}

// RUN TYPE CONTROL
function changeRunType(state, action){
  return state.update("runType", runType => action.payload.runType)
}

// REDUCER
export default function(state = Map(), action) {
  console.log("...reducer.action: ", action);
  switch (action.type) {
    case "SET_INITIAL_STATE":
    case "SIGN_IN":
    case "SIGN_OUT":
      return authenticationReducer(state, action);
    case "UPLOAD":
      return uploadReducer(state, action)
    case "CHANGE_RUNTYPE":
      return changeRunType(state, action)
    case "CHANGE_VIEW":
      return state //add reducer once we have more than 'Run' tab
    case "TOGGLE_DATASPACE_MODALS":
    case "UPDATE_PATHWAYS_MODAL_FILTERS":
    case "CHANGE_OBS_SET":
    case "CHANGE_OBS":
    case "CHANGE_PATHWAYS":
      return runViewSelectReducer(state, action)
    case "GRAPHVIS":
      return graphReducer(state, action)
  }
  return state
}
