import {Map} from "immutable";

function setState(state, newState){
  console.log("...setState: ")
  return state.merge(newState);
}
function TEST(state, action){
  console.log("...TEST: ")
  return state
}

export default function(state = Map(), action) {
  console.log(`...action: ${action.type}`)
  switch (action.type) {
    case "SET_STATE":
      return setState(state, action.state);
    case "TEST":
      return TEST(state, action);

  }
  return state;
}
