import React from 'react'

export class SelectObservationSet extends React.Component {

    render() {
        var self = this
        var numberOfObs = this.props.observationSetList.length
        var observationSetList = this.props.observationSetList.map(function(observationSet) {
              var typeKey = self.props.type.concat(observationSet.id)
              return (
                   <tr key={typeKey}> 
                       <td><input name="group1" 
                                  type="radio"
                                  id="test1"
                                  disabled={(numberOfObs === 0)?"disabled":""} />
                       </td>
                       <td>{observationSet.name}</td>
                   </tr>
              )

        })

        return (
            <table>
                <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                    {observationSetList}
                </tbody>
            </table>)
    }
}
