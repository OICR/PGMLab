// AUTHENTICATION
export function signIn(googleAuth){
  return {
    type: "SIGN_IN",
    googleIdToken: googleAuth.getAuthResponse.id_token
  }
}

// FACETED SEARCH ACTIONS
export function toggleFacetedSearch(){
  return {
    type: "TOGGLE_FACETED"
  }
}
export function updateIDFilter(text){
  return {
    type: "UPDATE_ID_FILTER",
    text
  }
}
export function updateTypeFilter(runType){
  return {
    type: "TOGGLE_TYPE_FILTER",
    runType
  }
}
export function updateStatusFilter(status){
  return {
    type: "TOGGLE_STATUS_FILTER",
    status
  }
}
export function updateDateSort(sort){
  return {
    type: "TOGGLE_DATE_SORT",
    sort
  }
}

// TABLE RESULTS UPDATING ACTIONS
export function setTasksInState(tasks){
  return {
    type: "SET_TASKS",
    tasks
  }
}
export function addTaskInState(taskDetails){
  return {
    type: "ADD_TASK",
    taskDetails
  }
}
export function updateTaskInState(updateDetails){
  return {
    type: "UPDATE_TASK",
    updateDetails
  }
}

// NOTIFY ON JOB SUBMIT
export function snackbarNotify(message){
  return {
    type: "SNACKBAR_NOTIFY",
    message
  }
}
