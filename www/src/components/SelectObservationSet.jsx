import React from 'react'

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
        <li key={observationSet.id} className="collection-item" onClick={()=>{this.handleSetSelect(observationSet.id)}}>
          <input ref={observationSet.id} id={observationSet.id} type="radio" checked={selected}/>
          <label htmlFor={observationSet.id}>{observationSet.name}</label>
        </li>
      );
    });
    const scrollable = {maxHeight: "260px", height:"260px", overflow: "scroll"}
    return (
      <form>
        <ul className="collection teal left-align" style={scrollable}>{observationSets}</ul>
      </form>
    );

  }
  render() {
  // console.log("SOS", this.props)
    // var self = this
    // var numberOfObs = this.props.observationSets.length
    // var observationSets = this.props.observationSets.map(function(observationSet, i) {
    //       var typeKey = self.props.type.concat(observationSet.id)
    //       return (
    //            <tr key={typeKey} className={(self.props.selectedObservationSet === i)? "pathway-item light-blue": "collection pathway-item"}>
    //                <td style={{minWidth: "262px"}} onClick={(self.props.selectedObservationSet !== i)? self.props.selectObservationSet.bind(this, i) : ""}>
    //                   {observationSet.name}
    //                </td>
    //            </tr>
    //       )
    //
    // })

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
