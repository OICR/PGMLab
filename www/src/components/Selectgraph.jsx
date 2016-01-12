import React from 'react'

export class SelectGraph extends React.Component {
    getChildren(pathways) {
       console.log("getting children");
       return  pathways.map(function(pahtway) {
          return  <tr key={pathway.id}><td>{pathway.name}</td><td>{pathway.id}a</td></tr>
       });

    }

    render () {
        var subGraphs = this.props.activePathway.children;

           return (
           <div className="col l12">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {subGraphs.map(function(pathway) {
                       return <tr key={pathway.id}><td>{pathway.name}</td><td>{pathway.id}</td></tr> 
                        if ("children" in pathway)  {
                             console.log("sdfdf");
                             getChildren(pathway.children); 
                        }

                       })}
                    </tbody>
                 </table>
            </div> )
    };
}
