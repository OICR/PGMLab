import {fromJS} from "immutable";
// All action types
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const UPLOAD = "UPLOAD";
const CHANGE_VIEW = "CHANGE_VIEW";
const CHANGE_RUNTYPE = "CHANGE_RUNTYPE";
const CHANGE_OBS_SET = "CHANGE_OBS_SET";
const CHANGE_OBS = "CHANGE_OBS";
const CHANGE_PATHWAYS = "CHANGE_PATHWAYS";

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

// SELECT PATHWAYS
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
