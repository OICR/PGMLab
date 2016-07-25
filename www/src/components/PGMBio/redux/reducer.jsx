import {Map} from "immutable";

import uploadReducer from "./uploadReducer.jsx";

export default function(state = Map(), action) {
  console.log("...reducer.action: ", action);
  switch (action.type) {
    case "SIGN_IN":
      console.log("logged in");
      return state
    case "UPLOAD":
      return uploadReducer(state, action);
  };
  return state;
}
