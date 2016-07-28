import {Map} from "immutable";

import uploadReducer from "./uploadReducer.jsx";

// Should match mapStateToProps
const auth = Map({
  signedIn: false,
  googleClientId: "852145575631-l5luk85au20hbh9p2vbf68u3jd7v0h1k.apps.googleusercontent.com",
  googleIdToken: ""
});
const initialAppState = {
  auth,
  uploads: Map({

  })
};

// AUTHENTICATION
function setInitialState(state, action){
  // pass reactomePathways from action.payload
  return state.merge(initialAppState);
};
function signIn(state, action){
  const signedIn = true;
  const {googleIdToken} = action.payload;
  return state.withMutations(state => state
      .update("auth", auth => auth.merge({signedIn, googleIdToken}))
  )
};
function signOut(state){
  return state.merge({auth});
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
