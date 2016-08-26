import {Map, OrderedMap, List} from "immutable"

// Should match mapStateToProps
const initialAppState = {
  auth: Map({
    signedIn: false,
    googleClientId: "852145575631-l5luk85au20hbh9p2vbf68u3jd7v0h1k.apps.googleusercontent.com",
    googleIdToken: ""
  }),
  uploads: Map(),
  uploadModalOpen: false,
  view: "Run",
  runType: "Inference", //PGMLab
  dataspace: Map({
    pathways: Map(), //pathways to send PGMLab
    observationSet: Map({ //observationSet to send PGMLab
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
        text: "", //pathwayID
        reactome: false,
        uploads: true
      })
    }),
    observationSetModal: Map({
      open: false
    })
  }),
  graphVis: Map({
    viewPathway: "", //pathwayID of graph to draw
    viewObservationSet: "", //observationSetID
    viewObservation: "" //index of observation selected
  }),
  observations: OrderedMap(),
  pathways: Map({ //pairwise interactions
    reactome: OrderedMap(), //pathways from wamp
    user: OrderedMap() //uploaded pathways
  }),
  results: Map({}), //results from inference async callbacks
  heatmap: Map({
    viewResult: "", //runID of result to draw
    viewPathway: "", //pathwayID of result to draw
    viewState: "", //state type to draw
    data: Map({
      inchlib: Map(), //a value from results[someRunID][inchlib]
      pathways: Map() //results[someRunID][pathways] mapped to get only ids and names
    })
  })
};

function mapStateToProps(state) {
  return {
    auth: state.get("auth"),
    uploads: state.get("uploads"),
    uploadModalOpen: state.get("uploadModalOpen"),
    view: state.get("view"),
    runType: state.get("runType"),
    dataspace: state.get("dataspace"),
    dataspaceModals: state.get("dataspaceModals"),
    graphVis: state.get("graphVis"),
    observations: state.get("observations"),
    pathways: state.get("pathways"),
    results: state.get("results"),
    heatmap: state.get("heatmap")
  }
}

export {initialAppState, mapStateToProps}
