import {Map, fromJS} from "immutable";

function setState(state, newState){
  return state.merge(newState);
}

// Construct tasks data as immutable
function setTasks(state, action){
  const tasksI = fromJS(action.tasks);
  // console.log(tasksI);
  return state.update("tasks", ()=>fromJS(action.tasks));
}

// Updates string value in state.idFilter
function setIDFilter(state, action){
  // console.log(action);
  return state.update("idFilter", ()=>action.text);
}
// Toggles boolean in state.typeFilters
function setTypeFilter(state, action){
  // console.log(action, state);
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
  return state.update("dateSort", ()=>action.sort);
}

// Adds a task (for SSE)
function addTask(state, action){
  console.log(action);
  return state.setIn(
    ["tasks", action["taskDetails"]["task_id"]],
    fromJS(action["taskDetails"])
  );
}
// Update a task (for SSE)
function updateTask(state, action){
  console.log(action);
  return state.updateIn(
    ["tasks", action["updateDetails"]["task_id"], "status"],
    ()=>action["updateDetails"]["task_status"]
  );
}

export default function(state = Map(), action) {
  console.log(`...action: ${action.type}`)
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return setState(state, action.initialState)
    // Getting and updating tasks data in state
    case "SET_TASKS":
      return setTasks(state, action);
    // Results Control
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
  }
  return state;
}
