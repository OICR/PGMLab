class LocationStore {
    constructor() {
        this.locations = [];
        this.bindListeners({
            handleUpdatelocations: LocationActions.UPDATE_LOCATIONS
        });
    }

    handleUpdateLocations (locations) {
        this.locations = locations;
    }
}

module.expors = alt.createStore(LocationStore, 'LocationStore');
