import React from 'react'

export class SelectedPathways extends React.Component {
    render() {
        var selectedPathwayIDs = this.props.selectedPathways
        var activePathwayID = this.props.activePathway.id

        var self = this
        var pathwayList = this.props.pathways.map(function(pathway) {
            var typeKey = self.props.type.concat(pathway.id)
            return( (selectedPathwayIDs.indexOf(pathway.id) === -1)? undefined :
                        <a key={typeKey} 
                           href="#!" 
                           className={(activePathwayID == pathway.id)? "collection-item light-blue black-text" : "collection-item"}
                           onClick={(activePathwayID === pathway.id)? undefined : self.props.setActivePathway.bind(this, pathway)}>
                             {pathway.name} 
                        </a>)
            })

        return (
            <ul className={(selectedPathwayIDs.length > 0)? "collection" : ""}>
                {pathwayList}
            </ul>)
   }


}


