// All action types
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const UPLOAD = "UPLOAD";
const CHANGE_VIEW = "CHANGE_VIEW";

// AUTHENTICATION
export function signInPGM(gAuth, userUploads, userObservations){
  const googleIdToken = gAuth.getAuthResponse().id_token;
  return {
    type: SIGN_IN,
    payload: {
      googleIdToken,
      userUploads,
      userObservations
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
