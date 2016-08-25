import {fromJS} from "immutable"
// All action types
const SIGN_IN = "SIGN_IN"
const SIGN_OUT = "SIGN_OUT"
const UPLOAD = "UPLOAD"
const TOGGLE_UPLOAD_MODAL = "TOGGLE_UPLOAD_MODAL"
const CHANGE_VIEW = "CHANGE_VIEW"
const CHANGE_RUNTYPE = "CHANGE_RUNTYPE"
const CHANGE_OBS_SET = "CHANGE_OBS_SET"
const CHANGE_OBS = "CHANGE_OBS"
const CHANGE_PATHWAYS = "CHANGE_PATHWAYS"
const HEATMAP = "HEATMAP"

// AUTHENTICATION
export function signInPGM(gAuth, userUploads, userObservations, userPathways){
  const googleIdToken = gAuth.getAuthResponse().id_token;
  return {
    type: SIGN_IN,
    payload: {
      googleIdToken,
      userUploads,
      userObservations,
      userPathways
    }
  };
}
export function signOut(){
  return {type: SIGN_OUT}
}

// UPLOAD DATA
export function onUploadSuccess(payload){
  return {
    type: UPLOAD,
    payload
  };
}

// CHANGE TAB
export function changeView(view){
  return {
    type: CHANGE_VIEW,
    payload: {
      view
    }
  }
}

// CHANGE BETWEEN LEARNING AND INFERENCE
export function changeRunType(runType){
  return {
    type: CHANGE_RUNTYPE,
    payload: {
      runType
    }
  }
}

// OPEN UPLOADS MODAL
export function toggleUploadModal(open){
  return {
    type: TOGGLE_UPLOAD_MODAL,
    payload: {
      open
    }
  }
}

// TOGGLE PATHWAY/OBSERVATION MODAL
export function toggleDataspaceModal(open, modalType){
  return {
    type: "TOGGLE_DATASPACE_MODALS",
    payload: {
      modalType, //PATHWAYS || OBS_SET
      open
    }
  }
}
// SET FILTERS IN SELECT PATHWAYS MODAL
export function updatePathwaysModalFilters(filterType, newValue){
  return {
    type: "UPDATE_PATHWAYS_MODAL_FILTERS",
    payload: {
      filterType,
      newValue
    }
  }
}

// SELECT OBSERVATION DATA
export function selectObservationSet(observationSet){
  return {
    type: CHANGE_OBS_SET,
    payload: {
      observationSet
    }
  }
}
export function selectObservation(obsIndex, checked){
  return {
    type: CHANGE_OBS,
    payload: {
      obsIndex,
      checked
    }
  }
}

// SELECT PATHWAY DATA
export function selectPathway(pathway, pathwaySource, pathwayID, pairwiseData, checked){
  return {
    type: CHANGE_PATHWAYS,
    payload: {
      pathwayID,
      pathway: pathway.withMutations(pathway => pathway
        .set("pathwaySource", pathwaySource)
        .set("data", fromJS(pairwiseData))),
      checked
    }
  }
}

// SELECT PATHWAY TO VISUALIZE ON GRAPH
export function graphVisSelectPathway(pathwayID){
  return {
    type: "GRAPHVIS",
    payload: {
      graphVisType: "SELECT_PATHWAY",
      pathwayID
    }
  }
}
// SELECT OBSERVATION TO VISUALIZE ON GRAPH
export function graphVisSelectObservation(obsIndex){
  return {
    type: "GRAPHVIS",
    payload: {
      graphVisType: "SELECT_OBSERVATION",
      obsIndex
    }
  }
}

// ADD RESULTS FROM INFERENCE FOR HEATMAP
export function onInferenceSuccess(result){
  const {pathways, observation_set, post_probs, inchlib, run_id} = result
  return {
    type: HEATMAP,
    payload: {
      heatmapType: "INFERENCE_SUCCESS",
      result: {
        runID: run_id,
        pathways,
        observationSet: observation_set,
        postProbs: post_probs,
        inchlib
      }
    }
  }
}

// SELECT A RESULT FOR HEATMAP
export function heatmapSelectResult(runID){
  return {
    type: HEATMAP,
    payload: {
      heatmapType: "SELECT_RESULT",
      runID
    }
  }
}
// SELECT A PATHWAY FOR HEATMAP
export function heatmapSelectPathway(pathwayID){
  return {
    type: HEATMAP,
    payload: {
      heatmapType: "SELECT_PATHWAY",
      pathwayID
    }
  }
}
// SELECT A STATE FOR HEATMAP
export function heatmapSelectState(state){
  return {
    type: HEATMAP,
    payload: {
      heatmapType: "SELECT_STATE",
      state
    }
  }
}
