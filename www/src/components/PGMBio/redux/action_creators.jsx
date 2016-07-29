// AUTHENTICATION
export function signIn(gAuth){
  const googleIdToken = gAuth.getAuthResponse().id_token;
  return {
    type: "SIGN_IN",
    payload: {
      googleIdToken
    }
  };
}
export function signOut(){
  return {
    type: "SIGN_OUT"
  }
}

// UPLOAD DATA
export function onUpload(payload){
  // payload = {info,data}
  return {
    type: "UPLOAD",
    payload
  };
}
