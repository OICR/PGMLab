// Reducer for handling selecting pathway/observation data to put into dataspace
import {Map, fromJS} from "immutable";

// RUN CONTROL PANEL
function changeObservationSet(state, action){
  return state.withMutations(state => state
    .setIn(["dataspace", "observationSet"], action.payload.observationSet)
    .updateIn(["dataspace", "observationSet", "data"], data => data.map(o => fromJS(o)))
    .setIn(["dataspace", "observationSet", "selected"], action.payload.observationSet.get("data").map(o => true))
  );
}
function changeObservation(state, action){
  const {obsIndex, checked} = action.payload
  return state.setIn(
    ["dataspace", "observationSet", "selected", obsIndex],
    checked
  );
}
function changePathways(state, action){
  const {pathwayID, pathway, checked} = action.payload
  if (checked) {
    return state.setIn(["dataspace", "pathways", pathwayID], fromJS(pathway));
  } else {
    return state.deleteIn(["dataspace", "pathways", pathwayID]);
  };
}

// HANDLE MODALS FOR POPULATING DATASPACE
function handleDataspaceModals(state, action){
  switch (action.payload.modalType) {
    case "PATHWAYS":
      return state.updateIn(["dataspaceModals", "pathwaysModal", "open"], open => action.payload.open)
    case "OBS_SET":
      return state.updateIn(["dataspaceModals", "observationSetModal", "open"], open => action.payload.open)
  }
}
function handlePathwaysModalFilters(state, action){
  return state.updateIn(
    ["dataspaceModals", "pathwaysModal", "filters", action.payload.filterType],
    filter => action.payload.newValue
  )
}

const runViewSelectReducer = (state=Map(), action) => {
  switch (action.type) {
    case "CHANGE_OBS_SET":
      return changeObservationSet(state, action)
    case "CHANGE_OBS":
      return changeObservation(state, action)
    case "CHANGE_PATHWAYS":
      return changePathways(state, action)
    case "TOGGLE_DATASPACE_MODALS":
      return handleDataspaceModals(state, action)
    case "UPDATE_PATHWAYS_MODAL_FILTERS":
      return handlePathwaysModalFilters(state, action)
  }
  return state;
}

export default runViewSelectReducer;
