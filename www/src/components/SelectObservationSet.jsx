import React from 'react'

export class SelectObservationSet extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      setFilterText: "",
      obsFilterText: ""
    };

    this.setFilterUpdate = this.setFilterUpdate.bind(this);
    this.obsFilterUpdate = this.obsFilterUpdate.bind(this);
    this.handleSetSelect = this.handleSetSelect.bind(this);
    this.handleObsSelect = this.handleObsSelect.bind(this);
    this.handleObsCheckAll = this.handleObsCheckAll.bind(this);
    this.handleObsUncheckAll = this.handleObsUncheckAll.bind(this);

    this.observationSetList = this.observationSetList.bind(this);
    this.observationsList = this.observationsList.bind(this);
  }
  componentDidMount(){
    $(".tooltipped").tooltip({delay: 25});
  }

  setFilterUpdate(){
    this.setState({setFilterText: this.refs["setFilterInput"].value});
  }
  obsFilterUpdate(){
    this.setState({obsFilterText: this.refs["obsFilterInput"].value});
  }
  handleSetSelect(observationSetID){
    this.props.selectObservationSet(observationSetID);
  }
  handleObsSelect(observationIndex){
    // const currentlySelected = this.props.selectedObservations.get("Indices");
    const currentlySelected = this.props.observationMap.get("Current").get("Selected Observations");
    // console.log(currentlySelected, currentlySelected2);
    switch (currentlySelected.includes(observationIndex)) {
      case true:
        this.props.removeSelectedObservations([observationIndex]);
        break;
      case false:
        this.props.selectObservations([observationIndex]);
        break;
    };
  }
  handleObsCheckAll(){
    const toSelect = this.props.observationMap.get("Current").get("Set").observations.map((obs,i)=>i);
    this.props.selectObservations(toSelect);
  }
  handleObsUncheckAll(){
    const selected = this.props.observationMap.get("Current").get("Set").observations.map((obs,i)=>i);
    this.props.removeSelectedObservations(selected);
  }

  // RENDERING //
  observationSetList(){
    let self = this;
    const textInput = isNaN(self.state.setFilterText) ? self.state.setFilterText.toLowerCase() : self.state.setFilterText;

    let observationMap = self.props.observationMap;
    let observationSets = (observationMap.get("All").size === 0) ?
      <div className="collection-item black-text"><span>No Observation Sets</span></div>
      :
      [... observationMap.get("All").values()].map((observationSet)=>{
        const textFilter = observationSet.name.toLowerCase().indexOf(textInput) && (observationSet.id.indexOf(textInput) == -1);
        const selected = observationMap.get("Current").get("Set").id === observationSet.id;
        return (
          (textFilter) ? undefined :
          <li key={observationSet.id} className="collection-item black-text"
            onClick={(evt)=>{evt.preventDefault();this.handleSetSelect(observationSet.id)}}>
            <input ref={observationSet.id} id={observationSet.id} type="radio" checked={selected} readOnly={true}/>
            <label htmlFor={observationSet.id} className="black-text">{observationSet.name}</label>
          </li>
        );
      });
    return (
      <div>
        <h5>Observation Sets</h5>
        <div className="divider"></div>
        <form>
          <input type="text" ref="setFilterInput" placeholder="Type to filter"
            value={this.state.setFilterText} onChange={this.setFilterUpdate}/>
          <ul className="collection teal lighten-2 left-align">
            {observationSets}
          </ul>
        </form>
      </div>
    );
  }
  observationsList(){
    let self = this;
    const textInput = isNaN(self.state.obsFilterText) ? self.state.obsFilterText.toLowerCase() : self.state.obsFilterText;

    const observationMap = this.props.observationMap;
    const observationSet = observationMap.get("Current").get("Set");
    const header = (observationSet.name === null) ?
      "Select an Observation" : observationSet.name;
    const observationsList = (
      <ul className="collection teal lighten-2 left-align">
        {
          (observationSet.observations.length === 0) ?
            <div className="collection-item"><span>No Observations</span></div>
            :
            observationSet.observations.map((observation,index) => {
              const textFilter = index.toString().indexOf(textInput) == -1;
              const selected = observationMap.get("Current").get("Selected Observations").includes(index);
              return (
                (textFilter) ? undefined :
                  <li key={index} className="collection-item black-text"
                      onClick={evt=>{evt.preventDefault();this.handleObsSelect(index)}}>
                    <input  ref={index} id={index} type="checkbox" className="filled-in"
                            checked={selected} readOnly={true}/>
                    <label htmlFor={index} className="black-text">{index}</label>
                  </li>
              );
            })
        }
      </ul>
    );
    const observationCount = `${observationMap.get("Current").get("Selected Observations").length} Observations`;
    const selectedCount = `${observationMap.get("Current").get("Selected Observations").length} Selected`;
    return (
      <div>
          <h5>{header}</h5>
          <div className="divider"></div>
          <form>
            <input type="text" ref="obsFilterInput" placeholder="Type to filter"
              value={this.state.obsFilterText} onChange={this.obsFilterUpdate}/>
            <div className="row valign-wrapper">
              <div className="col s8">{observationCount}<br/>{selectedCount}</div>
              <div className="col s2">
                <a className="btn-floating waves-effect right" onClick={this.handleObsCheckAll}>
                  <i className="material-icons">check_box</i>
                </a>
              </div>
              <div className="col s2">
                <a className="btn-floating waves-effect right" onClick={this.handleObsUncheckAll}>
                  <i className="material-icons">check_box_outline_blank</i>
                </a>
              </div>
            </div>
            {observationsList}
          </form>
      </div>
    );
  }
  render(){
    const scrollable={maxHeight:"100%", height:"100%", overflow:"scroll"};
    return (
      <div>
        <div id="selectObservationSetModal" className="modal modal-fixed-footer">
          <div className="modal-content" style={{overflow:"visible"}}>
            <div className="row" style={{height:"100%"}}>
              <div className="col s6" style={scrollable}>
                {this.observationSetList()}
              </div>
              <div className="col s6" style={scrollable}>
                {this.observationsList()}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close btn-flat">Close</a>
          </div>
        </div>
        <a  className="btn modal-trigger tooltipped" href="#selectObservationSetModal"
            data-position="top" data-tooltip="Select observation data to work with">
            Observations
        </a>
      </div>
    );
  }
}
