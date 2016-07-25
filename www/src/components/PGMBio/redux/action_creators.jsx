// AUTHENTICATION
export function signIn(){
  console.log("signed in");
  return {
    type: "SIGN_IN"
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
