import {Map, List, fromJS} from "immutable";

const isInteger = s => Number.isInteger(Number(s));

const uploadReducer = (state=Map(), action) => {
  action.payload["meta"]["_id"] = action.payload["meta"]["_id"]["$oid"];
  switch (action.payload["meta"]["type"]) {
    case "pathway":
      return state.withMutations(state => state
        .setIn(["uploads", action.payload["meta"]["_id"]], Map(action.payload["meta"]))
        .setIn(["pathways", "user", action.payload["json"]["_id"]], fromJS(action.payload["json"]))
      );
    case "observation":
      action.payload.json.data = List(action.payload.json.data);
      return state.withMutations(state => state
        .setIn(["uploads", action.payload["meta"]["_id"]], Map(action.payload["meta"]))
        .setIn(["observations", action.payload["meta"]["_id"]], Map(action.payload.json))
      );
    default:
      return state.setIn(["uploads", action.payload["meta"]["_id"]], Map(action.payload["meta"]));
  }
};
export default uploadReducer;
