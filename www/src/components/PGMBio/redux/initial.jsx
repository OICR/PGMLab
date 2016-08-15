import {Map, OrderedMap} from "immutable";

// Should match mapStateToProps
const auth = Map({
  signedIn: false,
  // signedIn: true,
  googleClientId: "852145575631-l5luk85au20hbh9p2vbf68u3jd7v0h1k.apps.googleusercontent.com",
  googleIdToken: ""
});
const initialAppState = {
  auth,
  uploads: Map(),
  view: "Run",
  dataspace: Map(),
  observations: OrderedMap()
};

function mapStateToProps(state) {
  return {
    auth: state.get("auth"),
    uploads: state.get("uploads"),
    view: state.get("view"),
    dataspace: state.get("dataspace"),
    observations: state.get("observations")
  };
}

export {initialAppState, mapStateToProps}
