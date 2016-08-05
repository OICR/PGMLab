// AUTHENTICATION
export function signInPGM(gAuth, userUploads){
  const googleIdToken = gAuth.getAuthResponse().id_token;
  return {
    type: "SIGN_IN",
    payload: {
      googleIdToken,
      userUploads
    }
  };
}
export function signOut(){
  return {
    type: "SIGN_OUT"
  }
}

// UPLOAD DATA
export function onUploadSuccess(payload){
  // payload = {info,data} from server upload
  return {
    type: "UPLOAD",
    payload
  };
}
