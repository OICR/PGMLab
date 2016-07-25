import {Map} from "immutable";
var when = require("when");

const isInteger = s => Number.isInteger(Number(s));

const readPathwayFile = (file) => {
  let reader = new FileReader();
  reader.onload = (upload) => {
    console.log("file read", upload.target.result);
  }
  reader.readAsText(file);
};

const uploadReducer = (state=Map(), action) => {
  console.log("...uploadReducer.action: ", action);
  switch (action.payload.uploadType) {
    case "PATHWAY":
      readPathwayFile(action.payload.file);
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
