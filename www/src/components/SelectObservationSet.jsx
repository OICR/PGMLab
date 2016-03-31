import React from 'react'

export class SelectObservationSet extends React.Component {

    render() {
        var self = this
        var numberOfObs = this.props.observationList.length
        var observationList = this.props.observationList.map(function(observation) {
              var typeKey = self.props.type.concat(observation.id)
              return (
                   <tr key={typeKey}> 
                       <td><input name="group1" 
                                  type="radio"
                                  id="test1"
                                  disabled={(numberOfObs === 0)?"disabled":""} />
                       </td>
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
