import {Map} from "immutable";

const isInteger = s => Number.isInteger(Number(s));

const uploadReducer = (state=Map(), action) => {
  console.log("...uploadReducer.action: ", action);
  switch (action.payload["meta"]["type"]) {
    case "pathway":
      console.log('pathway')
      // Flatten ObjectID
      action.payload["meta"]["_id"] = action.payload["meta"]["_id"].$oid;
      // Convert to Immutable Map
      return state.setIn(["uploads", action.payload["meta"]["_id"]], Map(action.payload["meta"]));
      break;
    case "observation":
      console.log('observation')
      break;
    case "parameters":
      console.log('params')
      break;
    case "probabilities":
      console.log('probs')
      break;
  };
  return state;
}
export default uploadReducer;
