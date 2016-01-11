import React from 'react'

export class SelectGraph extends React.Component {
    render () {
        var pathways = this.props.pathways;
        return (
           <div className="col l12">
                <ul id="dropdown1" className="dropdown-content">
                Pathways
                    {pathways.tree.map(function(pathway) {
                        return <li key={pathway.id}>{pathway.name}</li>
                       })}
                </ul>
                <a className="btn dropdown-button" href="#!" data-activates="dropdown1">
                    Pathways
                </a>
            </div> )
    };
}
