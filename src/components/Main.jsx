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
                            <Content pathways             ={this.props.pathways} 
                                     activePathway        ={this.props.activePathway}
                                     mutateGene           ={this.props.mutateGene}
                                     removeMutatedGene    ={this.props.removeMutatedGene}
                                     mutatedGenes         ={this.props.mutatedGenes}
                                     pairwiseInteractions ={this.props.pairwiseInteractions} />
                        </div>
                    </div>
                </div>
            </main>  )
    };
}
