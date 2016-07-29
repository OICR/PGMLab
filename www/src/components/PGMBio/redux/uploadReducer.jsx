import {Map} from "immutable";
var when = require("when");

const isInteger = s => Number.isInteger(Number(s));

const uploadReducer = (state=Map(), action) => {
  console.log("...uploadReducer.action: ", action);
  switch (action.payload["info"]["type"]) {
    case "pathway":
      console.log("pathway: ", action.payload["json"]["data"])
      break;
    case "observation":
      console.log("obs: ", action.payload["json"]["data"])
      break;
    case "parameters":
      console.log("pms: ", action.payload["json"]["data"])
      break;
    case "probabilities":
      console.log("pp: ", action.payload["json"]["data"])
      break;
  };
  return state;
}
export default uploadReducer;
