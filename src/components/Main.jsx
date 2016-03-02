import React from 'react'

import {Content} from './Content.jsx'

export class Main extends React.Component {
    render () {
console.log("Main", this.props);
        return (
           <main>
                <div className="container" className="col l12">
                    <div className="row">
                        <div className="col s12 m9 l12">
                            <Content pathways             = {this.props.pathways} 
                                     activePathway        = {this.props.activePathway}
                                     setActivePathway     = {this.props.setActivePathway}
                                     observeNode          = {this.props.observeNode}
                                     removeObservedNode   = {this.props.removeObservedNode}
                                     observedNodes        = {this.props.observedNodes}
                                     setNodeState         = {this.props.setNodeState}
                                     runInference         = {this.props.runInference}
                                     pairwiseInteractions = {this.props.pairwiseInteractions} />
                        </div>
                    </div>
                </div>
            </main>  )
    };
}
