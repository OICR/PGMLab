import {Map} from "immutable";

import uploadReducer from "./uploadReducer.jsx";

import {initialAppState} from "./initial.jsx";

// AUTHENTICATION
function setInitialState(state, action){
  // pass reactomePathways from action.payload into state
  const {reactomePathways} = action.payload;
  return state.withMutations(state => state
      .merge(initialAppState)
      .updateIn(["pathways", "reactome"], rPathways => rPathways.merge(reactomePathways))
  );
};
function signIn(state, action){
  const signedIn = true;
  const {googleIdToken, userUploads, userObservations, userPathways} = action.payload;
  return state.withMutations(state => state
      .update("auth", auth => auth.merge({signedIn, googleIdToken}))
      .update("uploads", uploads => uploads.merge(userUploads))
      .update("observations", observations => observations.merge(userObservations))
      .updateIn(["pathways", "user"], uPathways => uPathways.merge(userPathways))
  );
};
function signOut(state){
  return state.merge({auth});
}

function changeView(state, action){
  return state.update("view", view => action.payload.view)
}

// RUN TYPE CONTROL
function changeRunType(state, action){
  return state.update("runType", runType => action.payload.runType)
}

// RUN CONTROL PANEL
function changeObservationSet(state, action){
  return state.withMutations(state => state
    .setIn(["dataspace", "observationSet"], action.payload.observationSet)
    .setIn(["dataspace", "observationSet", "selected"], action.payload.observationSet.get("data").map(o => true))
  );
}
function changeObservation(state, action){
  const {obsIndex, checked} = action.payload;
  return state.setIn(
    ["dataspace", "observationSet", "selected", obsIndex],
    checked
  );
}
function changePathways(state, action){
  const {pathwaySource, pathwayID, pathway, checked} = action.payload;
  if (checked) {
    return state.setIn(["dataspace", "pathways", pathwayID], pathway);
  } else {
    return state.deleteIn(["dataspace", "pathways", pathwayID]);
  };
}

// REDUCER
export default function(state = Map(), action) {
  console.log("...reducer.action: ", action);
  switch (action.type) {
    case "SET_INITIAL_STATE":
      // return state.merge({...initialAppState});
      return setInitialState(state, action);
    case "SIGN_IN":
      return signIn(state, action);
    case "SIGN_OUT":
      return signOut(state)
    case "UPLOAD":
      return uploadReducer(state, action);
    case "CHANGE_RUNTYPE":
      return changeRunType(state, action);
    case "CHANGE_VIEW":
      return state //add reducer once we have more than 'Run' tab
    case "CHANGE_OBS_SET":
      return changeObservationSet(state, action);
    case "CHANGE_OBS":
      return changeObservation(state, action);
    case "CHANGE_PATHWAYS":
      return changePathways(state, action);
  };
  return state;
}
