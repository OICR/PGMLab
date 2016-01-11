import React from 'react'

import {Content} from './Content.jsx'

export class Main extends React.Component {
    render () {
        console.log(this.props.pairwise_interactions);
        return (
           <main>
                <div className="container" className="col l12">
                    <div className="row">
                        <div className="col s12 m9 l10">
                            <Content pathways              ={this.props.pathways} 
                                     pairwise_interactions ={this.props.pairwise_interactions} />
                        </div>
                    </div>
                </div>
            </main>  )
    };
}


