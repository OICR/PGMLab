import React from 'react'

export class SelectObservationSet extends React.Component {

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
            <table style={{display:"table"}}>
                <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                    {observationSets}
                </tbody>
            </table>)
    }
}
