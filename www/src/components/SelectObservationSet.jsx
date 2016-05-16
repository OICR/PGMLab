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

    this.observationSetList = this.observationSetList.bind(this);
    this.observationsList = this.observationsList.bind(this);
  }

  setFilterUpdate(){
    this.setState({setFilterText: this.refs["setFilterInput"].value});
  }
  obsFilterUpdate(){
    this.setState({obsFilterText: this.refs["obsFilterInput"].value});
  }
  handleSetSelect(observationSetID){
    console.log("handleSetSelect");
    this.props.selectObservationSet(observationSetID, this.props.runType);
  }
  handleObsSelect(observationIndex){
    console.log("handleObsSelect");
  }

  // RENDERING //
  observationSetList(){
    let self = this;
    const textInput = isNaN(self.state.setFilterText) ? self.state.setFilterText.toLowerCase() : self.state.setFilterText;
    const currentSelectedSetID = self.props.selectedObservationSet.get(self.props.runType).id;
    let observationSets = [... self.props.observationSets.values()].map((observationSet)=>{
      const textFilter = observationSet.name.toLowerCase().indexOf(textInput) && (observationSet.id.indexOf(textInput) == -1);
      const selected = currentSelectedSetID === observationSet.id;
      return (
        (textFilter) ? undefined :
        <li key={observationSet.id} className="collection-item black-text"
          onClick={(evt)=>{this.handleSetSelect(observationSet.id)}}>
          <input ref={observationSet.id} id={observationSet.id} type="radio" checked={selected} readOnly={true}/>
          <label htmlFor={observationSet.id} className="black-text">{observationSet.name}</label>
        </li>
      );
    });
    const scrollable = {maxHeight: "210px", height:"210px", overflow: "scroll"};
    return (
      <div>
        <h5>Observation Sets</h5>
        <div className="divider"></div>
        <form>
          <input type="text" ref="setFilterInput" placeholder="Type to filter"
            value={this.state.setFilterText} onChange={this.setFilterUpdate}/>
          <ul className="collection teal lighten-2 left-align" style={scrollable}>
            {observationSets}
          </ul>
        </form>
      </div>
    );
  }
  observationsList(){
    let self = this;
    const selectedObservationSet = this.props.selectedObservationSet.get(this.props.runType);
    console.log(selectedObservationSet);
    const textInput = isNaN(self.state.obsFilterText) ? self.state.obsFilterText.toLowerCase() : self.state.obsFilterText;
    const selectedObservations = this.props.selectedObservations.get(this.props.runType);
    let observations = selectedObservationSet.observations.map((observation,index)=>{
      // const textFilter = observationSet.name.toLowerCase().indexOf(textInput) && (observationSet.id.indexOf(textInput) == -1);
      // observations dont have names yet, are labelled by index
      const textFilter = index.toString().indexOf(textInput) == -1;
      const selected = selectedObservations.includes(index);
      return (
        (textFilter) ? undefined :
          <li key={index} className="collection-item black-text" onClick={(evt)=>this.handleObsSelect(index)}>
            <input ref={index} id={index} type="checkbox" className="filled-in" checked={selected} readOnly={true}/>
            <label htmlFor={index} className="black-text">{index}</label>
          </li>
      );
    });
    const scrollable = {maxHeight: "210px", height:"210px", overflow: "scroll"};
    return (
      <div>
        <h5>{selectedObservationSet.name}</h5>
        <div className="divider"></div>
        {
          (selectedObservationSet.observations.length===0) ? <h5>No Observations!</h5> :
          <form>
            <input type="text" ref="obsFilterInput" placeholder="Type to filter"
              value={this.state.obsFilterText} onChange={this.obsFilterUpdate}/>

            <ul className="collection teal lighten-2 left-align" style={scrollable}>
              {observations}
            </ul>
          </form>
        }
      </div>
    );
  }
  render() {
  // console.log("SOS", this.props)
    return (
      <div id="selectObservationSetModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s6">
              {this.observationSetList()}
            </div>
            <div className="col s6">
              {this.observationsList()}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close btn-flat">Close</a>
        </div>
      </div>
    );
  }
}
