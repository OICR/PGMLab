import React from 'react'

export class PathwayNames extends React.Component {
    constructor (props) {
        super();
        this.state =  {
            active_pathway: false
        };
    }
    handleClick (pathway){
        this.state = {
            active_pathway: pathway.id
        };
    }
    render() {
        var input = this.props.filter.toLowerCase();
        var pathways = this.props.pathways;

        var self = this;
        var pathwayList = pathways.tree.map(function(pathway) {
            return (pathway.name.toLowerCase().indexOf(input))? undefined :
                 <p key={pathway.id} onClick={self.handleClick} className="collection-item pathway-item">{pathway.name}</p> });

        return (
           <div className="collection pathway-list">
              {pathwayList}
           </div> );
   }


}
