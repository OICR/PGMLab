// Reducer for initializing and signing in/out
import {Map} from "immutable";
import {initialAppState} from "./initial.jsx";

function setInitialState(state, action){
  // pass reactomePathways from action.payload into state
  const {reactomePathways} = action.payload;
  return state.withMutations(state => state
      .merge(initialAppState)
      .updateIn(["pathways", "reactome"], rPathways => rPathways.merge(reactomePathways))
  );
}

function signIn(state, action){
  const signedIn = true;
  const {googleIdToken, userUploads, userObservations, userPathways} = action.payload;
  return state.withMutations(state => state
      .update("auth", auth => auth.merge({signedIn, googleIdToken}))
      .update("uploads", uploads => uploads.merge(userUploads))
      .update("observations", observations => observations.merge(userObservations))
      .updateIn(["pathways", "user"], uPathways => uPathways.merge(userPathways))
  );
}

function signOut(state){
  //should have something to handle better google signing in/out, might have to move wamp calls
  const {auth} = initialAppState;
  return state.merge({auth});
}

const authenticationReducer = (state=Map(), action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return setInitialState(state, action);
    case "SIGN_IN":
      return signIn(state, action);
    case "SIGN_OUT":
      return signOut(state)
  }
  return state;
}

export default authenticationReducer;
