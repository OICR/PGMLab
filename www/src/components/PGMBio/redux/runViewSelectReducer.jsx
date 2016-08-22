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
  console.log('changepathways', pathway.get("data"))
  if (checked) {
    return state.setIn(["dataspace", "pathways", pathwayID], fromJS(pathway));
  } else {
    return state.deleteIn(["dataspace", "pathways", pathwayID]);
  };
}

const runViewSelectReducer = (state=Map(), action) => {
  switch (action.type) {
    case "CHANGE_OBS_SET":
      return changeObservationSet(state, action);
    case "CHANGE_OBS":
      return changeObservation(state, action);
    case "CHANGE_PATHWAYS":
      return changePathways(state, action);
  }
  return state;
}

export default runViewSelectReducer;
