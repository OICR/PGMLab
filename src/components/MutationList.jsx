import React from 'react'

export class MutationList extends React.Component {
    
     render () {
        var self = this;
        return (
             <div style={{overflow: "scroll", height: "200px"}}>
               <table style={{padding: "0px"}}>
                  <tbody>
               {self.props.mutatedGenes.map(function(gene, i) {
                 var geneName = (gene.longname != null)? gene.longname: gene.id;
                 return (
                          <tr key={i} style={{padding: "0px"}}>
                            <td>{geneName}</td>
                            <td onClick={self.props.removeMutatedGene.bind(self, gene)} >X</td>
                           </tr>) ;
               })}
                  </tbody>
               </table>
             </div>
        )
     }

}
