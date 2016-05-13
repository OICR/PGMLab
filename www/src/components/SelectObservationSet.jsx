import React from 'react'

export class SelectObservationSet extends React.Component {
  constructor (props) {
    super(props);
  }

  // RENDERING //
  observation(){

  }
  observationSetList(){

  }
  render() {
  // console.log("SOS", this.props)
    var self = this
    var numberOfObs = this.props.observationSets.length
    var observationSets = this.props.observationSets.map(function(observationSet, i) {
          var typeKey = self.props.type.concat(observationSet.id)
          return (
               <tr key={typeKey} className={(self.props.selectedObservationSet === i)? "pathway-item light-blue": "collection pathway-item"}>
                   <td style={{minWidth: "262px"}} onClick={(self.props.selectedObservationSet !== i)? self.props.selectObservationSet.bind(this, i) : ""}>
                      {observationSet.name}
                   </td>
               </tr>
          )

    })

    return (
      <div id="selectObservationSetModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s6">
              <table style={{display:"table"}}>
                  <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                      {observationSets}
                  </tbody>
              </table>
            </div>
            <div className="col s6">
              OBSERVATIONS
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
