import {Map} from "immutable";

export default function(state = Map(), action) {
  console.log("...action: ", action);
  switch (action.type) {
    case "SIGN_IN":
      console.log("logged in");
      return state
  }
  return state;
}
