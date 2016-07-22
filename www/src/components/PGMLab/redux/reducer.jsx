import {Map, fromJS} from "immutable";
// Initial app state for app start up and signing out
const initialAppState = {
  auth: Map({
    signedIn: false,
    googleProfile: Map({
      "name": "",
      "email": ""
    }),
    googleClientId: "852145575631-a44j86epgif1illc4alnol126j4qsoku.apps.googleusercontent.com", //Google Console
    googleIdToken: ""
  }),
  tasks: Map(),
  showFaceted: false,
  typeFilters: Map({
    "learning": true,
    "inference": true
  }),
  statusFilters: Map({
    "task-received": true,
    "task-started": true,
    "task-succeeded": true,
    "task-failed": true
  }),
  dateSort: "descending",
  idFilter: "",
  snackbarMessage: ""
}

// Update user info and their tasks
function signIn(state, action){
  const signedIn = true;
  const {tasks, googleIdToken, ...nameEmail} = action;
  const googleProfile = Map(nameEmail);
  return state.withMutations(state => {
    return state
      .update("auth", auth => auth.merge({signedIn, googleIdToken, googleProfile}))
      .update("tasks", () => fromJS(tasks))
  });
}
function signOut(state){
  return state.merge(initialAppState);
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
  console.log("...action: ", action);
  switch (action.type) {
    case "SIGN_IN":

      return signIn(state, action);
    case "SIGN_OUT":
      return signOut(state);
    case "SET_INITIAL_STATE":
      const {wamp} = action;
      return state.merge({wamp, ...initialAppState});
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
