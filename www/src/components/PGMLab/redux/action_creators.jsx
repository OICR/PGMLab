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

export function updateStatusFilter(status) {
  return {
    type: "TOGGLE_STATUS_FILTER",
    status
  }
}

export function updateDateSort(sort) {
  return {
    type: "TOGGLE_DATE_SORT",
    sort
  }
}
