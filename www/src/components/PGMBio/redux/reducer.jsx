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

function changeObservationSet(state, action){
  return state.withMutations(state => state
    .setIn(["dataspace", "observationSet"], action.payload.observationSet)
    .setIn(["dataspace", "observationSet", "selected"], action.payload.observationSet.get("data").map(o => true))
  );
}
function changeObservations(state, action){
  return state.setIn(
    ["dataspace", "observationSet", "selected"],
    action.payload.selected.reduce(
      (selected, obsIndex) => selected.set(obsIndex, true),
      state.getIn(["dataspace", "observationSet", "data"]).map(o => false)
    )
  );
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
    case "CHANGE_VIEW":
      return state //add reducer once we have more than 'Run' tab
    case "CHANGE_OBS_SET":
      return changeObservationSet(state, action);
    case "CHANGE_OBS":
      return changeObservations(state, action);
  };
  return state;
}
