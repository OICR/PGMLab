import React from 'react';

export class SelectObservationSet extends React.Component {
  constructor (props) {
    super(props);

    this.handleSetSelect = this.handleSetSelect.bind(this);
    this.observationSetList = this.observationSetList.bind(this);
  }

  handleSetSelect(observationSetID){
    this.props.selectObservationSet(observationSetID, this.props.runType);
    // const selected = this.refs[observationSetID].checked;
  }

  // RENDERING //
  observationSetList(){
    let observationSets = [... this.props.observationSets.values()].map((observationSet)=>{
      const selected = this.props.selectedObservationSet.id === observationSet.id;
      return (
        <li key={observationSet.id} className="collection-item"
          onClick={(evt)=>{evt.preventDefault();this.handleSetSelect(observationSet.id)}}>
          <input ref={observationSet.id} id={observationSet.id} type="radio" checked={selected}/>
          <label htmlFor={observationSet.id}>{observationSet.name}</label>
        </li>
      );
    });
    const scrollable = {maxHeight: "260px", height:"260px", overflow: "scroll"};
    return (
      <form>
        <ul className="collection teal left-align" style={scrollable}>
          {observationSets}
        </ul>
      </form>
    );
  }
  observationsList(){
    // let observations =
    const selectedObservationSet=this.props.selectedObservationSet.get(this.props.runType);
    let observations = selectedObservationSet.observations.map((observations,index)=>{
      return (
        <li key={index} className="collection-item">
          <input type="checkbox" id={index} type="checkbox"/>
          <label htmlFor={index}>{index}</label>
        <li/>
      );
    });
    // const scrollable = {maxHeight: "260px", height:"260px", overflow: "scroll"};
    return (
      <form>
        <ul className="collection teal left-align" style={scrollable}>
          {observations}
        </ul>
      </form>
    );
  }
  render() {
  // console.log("SOS", this.props)
    return (
      <div id="selectObservationSetModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s6">
              <h5>Observation Sets</h5>
              <div className="divider"></div>
              {this.observationSetList()}
            </div>
            <div className="col s6">
              <h5>Observations</h5>
              <div className="divider"></div>
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
