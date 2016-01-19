import React from 'react'

export class PathwayNames extends React.Component {
    render() {
        var input = (isNaN(this.props.filter))? this.props.filter.toLowerCase(): this.props.filter;
        var pathways = this.props.pathways;
        var selectedPathwayID = this.props.activePathway.id;

        var self = this;
        var pathwayList = pathways.tree.map(function(pathway) {
            return (pathway.name.toLowerCase().indexOf(input) && (pathway.id.indexOf(input) == -1))? undefined : 
                     <tr key={pathway.id} 
                         onClick={(selectedPathwayID != pathway.id)? self.props.setActivePathway.bind(this,pathway) : undefined}
                         className={(selectedPathwayID == pathway.id)? "pathway-item light-blue": "collection pathway-item"}>
                        <td>{pathway.name}</td>
                        <td>{pathway.id}</td>
                     </tr> });

        return (
            <tbody>
                {pathwayList}
            </tbody>);
   }


}
