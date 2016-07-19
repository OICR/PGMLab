import {Map, fromJS} from "immutable";

function setGoogleAuth(state, action){
  const {googleIdToken} = action;
  const signedIn = true;
  return state.update("auth", auth => auth.merge({signedIn, googleIdToken}));
}

// Standard setState
function setState(state, newState){
  return state.merge(newState);
}

// Construct tasks data as immutable
function setTasks(state, action){
  return state.update("tasks", () => fromJS(action.tasks));
}

// Toggle faceted search show/hide
function toggleFaceted(state, action){
  return state.update("showFaceted", showFaceted => !showFaceted);
}
// Updates string value in state.idFilter
function setIDFilter(state, action){
  return state.update("idFilter", () => action.text);
}
// Toggles boolean in state.typeFilters
function setTypeFilter(state, action){
  return state.updateIn(
    ["typeFilters", action.runType],
    typeOn => !typeOn
  );
}
// Toggles boolean in state.statusFilters
function setStatusFilter(state, action){
  return state.updateIn(
    ["statusFilters", action.status],
    statusOn => !statusOn
  );
}
// Toggles date sorting between 'ascending'||'descending'
function setDateSort(state, action){
  return state.update("dateSort", () => action.sort);
}

// Adds a task (for SSE)
function addTask(state, action){
  return state.setIn(
    ["tasks", action["taskDetails"]["task_id"]],
    fromJS(action["taskDetails"])
  );
}
// Update a task (for SSE)
function updateTask(state, action){
  return state.updateIn(
    ["tasks", action["updateDetails"]["task_id"], "status"],
    () => action["updateDetails"]["task_status"]
  );
}

// Snackbar notify on job submit
function notify(state, action){
  return state.update("snackbarMessage", () => action.message);
}

export default function(state = Map(), action) {
  console.log(`...action:`, action)
  switch (action.type) {
    case "SIGN_IN":
      return setGoogleAuth(state, action);
    case "SET_INITIAL_STATE":
      return setState(state, action.initialState);
    // Getting and updating tasks data in state
    case "SET_TASKS":
      return setTasks(state, action);
    // Results Control
    case "TOGGLE_FACETED":
      return toggleFaceted(state, action);
    case "UPDATE_ID_FILTER":
      return setIDFilter(state, action);
    case "TOGGLE_TYPE_FILTER":
      return setTypeFilter(state, action);
    case "TOGGLE_STATUS_FILTER":
      return setStatusFilter(state, action);
    case "TOGGLE_DATE_SORT":
      return setDateSort(state, action);
    // SSE events
    case "ADD_TASK":
      return addTask(state, action);
    case "UPDATE_TASK":
      return updateTask(state, action);
    // Snackbar notification for job submission
    case "SNACKBAR_NOTIFY":
      return notify(state, action);
  }
  return state;
}
