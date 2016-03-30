import React from 'react'

export class SelectObservationSet extends React.Component {

    render() {
        console.log("SOS", this.props)

        var self = this
        var observationList = this.props.observationList.map(function(observation) {
              var typeKey = this.props.type.concat(observation.id)
              return (
                   <tr key={typeKey}> 
                       <td> radioDial</td>
                       <td>{observation.name}</td>
                   </tr>
              )

        })

        return (
            <table>
                <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                    {observationList}
                </tbody>
            </table>)
    }
}
