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

// UPLOAD DATA
export function uploadFile(evt, uploadType){
  const file = evt.target.files[0];
  return {
    type: "UPLOAD",
    payload: {
      uploadType,
      file
    }
  };
}
