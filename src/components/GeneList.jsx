import React from 'react'

export class GeneList extends React.Component {
    
     render () {
        var self = this;
        return (
             <div style={{overflow: "scroll", height: "285px"}}>
               {this.props.pairwiseInteractions.nodes.map(function(gene, i) {
                 var geneName = (gene.longname != null)? gene.longname: gene.id;
                  
                 var geneStyle = {width: "274px", borderBottom: "solid 1px"}
                 var geneClass = "waves-effect waves-light black-text";
                 var found = self.props.mutatedGenes.some(function (el) { return el.name === gene.name  })     

                 if (found) {
                     geneClass += " blue"; 
                 } else {
                     geneClass += " white";
                 }
                 
                 return  <div key={i} 
                              onClick={self.props.mutateGene.bind(this, gene)} 
                              className={geneClass}
                              style={geneStyle}>{geneName}</div>;
               })}
             </div>

        )
     }

}
