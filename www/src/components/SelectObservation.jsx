import React from 'react'

export class SelectObservation extends React.Component {

    componentDidMount() {
        $('.collapsibleObservations').collapsible({accordion : true})
    }


    render() {
// console.log("SO", this.props)
        var self = this
        var numberOfObs = this.props.observations.length
        var observations = this.props.observations.map(function(observation, i) {
              var typeKey = self.props.type.concat("observations").concat(i)
              return (
                   <tr key={typeKey} className={(self.props.selectedObservation === i)? "pathway-item light-blue": "collection pathway-item"}>
                       <td style={{minWidth: "262px"}} onClick={(self.props.selectedObservation !== i)? self.props.selectObservation.bind(this, i) : ""}>
                          {i}
                       </td>
                   </tr>
              )

        })

        return (
            <ul className="collapsible collapsibleObservations" data-collapsible="accordion">
                <li>
                    <div className="collapsible-header"><i className="material-icons">group_work</i>Observations</div>
                    <div className="collapsible-body">
                       <table style={{display:"table"}}>
                            <tbody style={{display:"block", maxHeight:"150px", overflowY: "scroll"}}>
                                 {observations}
                            </tbody>
                       </table>
                    </div>
                </li>
            </ul>)
    }
}
