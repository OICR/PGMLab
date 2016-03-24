import React from 'react'

import {SelectNodeState} from './SelectNodeState.jsx';

export class ObservedNodeList extends React.Component {
    
     render () {
        var self = this;
console.log("ObservedNodeList", this.props);
        return (
             <div style={{overflow: "scroll", height: "200px"}}>
               <table style={{padding: "0px"}}>
                  <tbody>
               {self.props.observedNodes.map(function(node, i) {
                 var nodeName = ((node.longname !== null) && (node.longname !== undefined))? node.longname: node.name;
                 return (
                          <tr key={i} style={{padding: "0px"}}>
                            <td onClick={self.props.removeObservedNode.bind(this, node)} ><i className="material-icons dp48">delete</i></td>
                            <td style={{width: "100%"}}>{nodeName}</td>
                            <td><SelectNodeState state={node.state} setNodeState={self.props.setNodeState} node={node} /></td>
                           </tr>) ;
               })}
                  </tbody>
               </table>
             </div>
        )
     }

}
