import {Map, OrderedMap, List} from "immutable";

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
  runType: "Learning",
  dataspace: Map({
    pathways: Map(),
    observationSet: Map({
      selected: List(),
      data: List(),
      _id: "",
      user_id: "",
      filename: ""
    })
  }),
  dataspaceModals: Map({
    pathwaysModal: Map({
      open: false,
      filters: Map({
        text: "",
        reactome: true,
        uploads: true
      })
    }),
    observationSetModal: Map({
      open: false
    })
  }),
  graphVis: Map({
    viewPathway: "", //pathway ID of graph to draw
    viewObservationSet: "",
    viewObservation: "" //index of obsevation selected, still need to check if same observationSet
  }),
  observations: OrderedMap(),
  pathways: Map({
    reactome: OrderedMap(),
    user: OrderedMap()
  })
};

function mapStateToProps(state) {
  return {
    auth: state.get("auth"),
    uploads: state.get("uploads"),
    view: state.get("view"),
    runType: state.get("runType"),
    dataspace: state.get("dataspace"),
    dataspaceModals: state.get("dataspaceModals"),
    graphVis: state.get("graphVis"),
    observations: state.get("observations"),
    pathways: state.get("pathways")
  };
}

export {initialAppState, mapStateToProps}
