import {Map} from "immutable";

import uploadReducer from "./uploadReducer.jsx";

// Should match mapStateToProps
const initialAppState = {
  auth: Map({
    signedIn: false,
    googleClientId: "852145575631-l5luk85au20hbh9p2vbf68u3jd7v0h1k.apps.googleusercontent.com",
    googleIdToken: ""
  }),
  uploads: Map({

  })
}

function signIn(state, action){
  const signedIn = true;
  const {googleIdToken} = action.payload;
  return state.withMutations(state => state
      .update("auth", auth => auth.merge({signedIn,googleIdToken}))
  )
};

// REDUCER
export default function(state = Map(), action) {
  console.log("...reducer.action: ", action);
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return state.merge({...initialAppState});
    case "SIGN_IN":
      console.log("logged in");
      return signIn(state, action);
    case "UPLOAD":
      return uploadReducer(state, action);
  };
  return state;
}
