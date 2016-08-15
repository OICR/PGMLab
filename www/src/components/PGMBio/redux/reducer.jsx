import {Map} from "immutable";

import uploadReducer from "./uploadReducer.jsx";

import {initialAppState} from "./initial.jsx";

// AUTHENTICATION
function setInitialState(state, action){
  // pass reactomePathways from action.payload
  return state.merge(initialAppState);
};
function signIn(state, action){
  const signedIn = true;
  const {googleIdToken, userUploads, userObservations} = action.payload;
  return state.withMutations(state => state
      .update("auth", auth => auth.merge({signedIn, googleIdToken}))
      .update("uploads", uploads => uploads.merge(userUploads))
      .update("observations", observations => observations.merge(userObservations))
  );
};
function signOut(state){
  return state.merge({auth});
}

// TAB
function changeView(state, action){
  return state.update("view", view => action.payload.view)
}

// REDUCER
export default function(state = Map(), action) {
  console.log("...reducer.action: ", action);
  switch (action.type) {
    case "SET_INITIAL_STATE":
      // return state.merge({...initialAppState});
      return setInitialState(state)
    case "SIGN_IN":
      return signIn(state, action);
    case "SIGN_OUT":
      return signOut(state)
    case "UPLOAD":
      return uploadReducer(state, action);
  };
  return state;
}
