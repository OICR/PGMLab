export function TEST() {
  return {
    type: "TEST"
  }
}

export function updateIDFilter(text) {
  return {
    type: "UPDATE_ID_FILTER",
    text
  }
}

export function updateTypeFilter(runType) {
  return {
    type: "TOGGLE_TYPE_FILTER",
    runType
  }
}
