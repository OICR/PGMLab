var alt = require('../alt');

class LocationActions {
  updateLocations(locations) {
    return locations;
  }
}

module.exports = alt.createActions(LocationActions);
