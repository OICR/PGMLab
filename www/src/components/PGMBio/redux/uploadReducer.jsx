import {Map} from "immutable";
var when = require("when");

const isInteger = s => Number.isInteger(Number(s));

const uploadReducer = (state=Map(), action) => {
  console.log("...uploadReducer.action: ", action);
  switch (action.payload.uploadType) {
    case "PATHWAY":
      break;
    case "OBSERVATIONS":
      break;
    case "PARAMETERS":
      break;
    case "PROBABILITIES":
      break;
  };
  return state;
}
export default uploadReducer;
