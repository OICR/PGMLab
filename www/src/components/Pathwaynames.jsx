import React from 'react'

export class PathwayNames extends React.Component {
    render() {
        var input = (isNaN(this.props.filter))? this.props.filter.toLowerCase(): this.props.filter
        var pathways = this.props.pathways
        var selectedPathwayIDs = this.props.selectedPathways
        var activePathwayID = this.props.activePathway.id
        var self = this
        var pathwayList = pathways.map(function(pathway) {
            var typeKey = self.runType.concat("-").concat(pathway.id)
            return (pathway.name.toLowerCase().indexOf(input) && (pathway.id.indexOf(input) == -1))? undefined : 
                     <tr key={typeKey} 
                         className={(activePathwayID == pathway.id)? "pathway-item light-blue": "collection pathway-item"}>
                        <td>
                            <input type="checkbox" className="filled-in" id={pathway.id} />
                            <label htmlFor={pathway.id} onClick={(self.props.selectedPathways.indexOf(pathway.id) !== -1)? 
                                                                         self.props.removeSelectedPathway.bind(this, pathway.id):
                                                                         self.props.selectPathway.bind(this, pathway.id)} />
                        </td>
                        <td onClick={(activePathwayID === pathway.id)? undefined : self.props.setActivePathway.bind(this, pathway)}>{pathway.name}</td>
                     </tr> });

        return (
            <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                {pathwayList}
            </tbody>);
   }


}
