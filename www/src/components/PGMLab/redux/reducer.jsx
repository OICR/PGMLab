import {Map, fromJS} from "immutable";

function setState(state, newState){
  return state.merge(newState);
}

// Construct tasks data as immutable
function setTasks(state, action){
  const tasksI = fromJS(action.tasks);
  // console.log(tasksI);
  return state.update("tasks", tasks=>tasksI);
}

// Updates string value in state.idFilter
function setIDFilter(state, action){
  // console.log(action);
  return state.update("idFilter", idText=>action.text);
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
  return state.update("dateSort", dateSort=>action.sort);
}

function TEST(state, action){
  console.log("...TEST: ")
  return state
}

export default function(state = Map(), action) {
  console.log(`...action: ${action.type}`)
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return setState(state, action.initialState)
    case "SET_STATE":
      return setState(state, action.state);
    case "TEST":
      return TEST(state, action);
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
  }
  return state;
}
