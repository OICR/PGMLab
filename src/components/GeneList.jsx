import React from 'react'

export class GeneList extends React.Component {
    
     render () {
        var self = this;
        return (
             <div style={{overflow: "scroll", height: "285px"}}>
               {this.props.pairwiseInteractions.nodes.map(function(node, i) {
                 var nodeName = ((node.longname !== null) && (node.longname !== undefined))? node.longname: node.name;
                 var nodeStyle = {width: "274px", borderBottom: "solid 1px"}
                 var nodeClass = "waves-effect waves-light black-text";
                 var found = self.props.observedNodes.some(function (el) { return el.name === node.name  })     
                 if (found) {
                     nodeClass += " blue"; 
                 } else {
                     nodeClass += " white";
                 }
                 
                 return  <div key={i} 
                              onClick={self.props.observeNode.bind(this, node)} 
                              className={nodeClass}
                              style={nodeStyle}>{nodeName}</div>;
               })}
             </div> )
     }
}
