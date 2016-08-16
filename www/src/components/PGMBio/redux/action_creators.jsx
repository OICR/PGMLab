// All action types
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const UPLOAD = "UPLOAD";
const CHANGE_VIEW = "CHANGE_VIEW";
const CHANGE_OBS_SET = "CHANGE_OBS_SET";
const CHANGE_OBS = "CHANGE_OBS";

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

// SELECT OBSERVATION DATA
export function selectObservationSet(observationSet){
  return {
    type: CHANGE_OBS_SET,
    payload: {
      observationSet
    }
  }
}
export function selectObservations(selected){
  return {
    type: CHANGE_OBS,
    payload: {
      selected
    }
  }
}
