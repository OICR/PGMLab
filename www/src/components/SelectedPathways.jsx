import React from 'react'

export class SelectedPathways extends React.Component {
    render() {
        var selectedPathwayIDs = this.props.selectedPathways
        var pathwayList = this.props.pathways.map(function(pathway) {
            return( (selectedPathwayIDs.indexOf(pathway.id) === -1)? undefined :
                        <li key={typeKey}>{pathway.name}</li>);
            })

        return (
            <ul>
                {pathwayList}
            </ul>)
   }


}
