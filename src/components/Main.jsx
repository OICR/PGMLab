import React from 'react'

import {Content} from './Content.jsx'

export class Main extends React.Component {
    render () {
        return (
           <main>
                <div className="container" className="col l12">
                    <div className="row">
                        <div className="col s12 m9 l12">
                            <Content pathways             ={this.props.pathways} 
                                     activePathway        ={this.props.activePathway}
                                     pairwiseInteractions ={this.props.pairwiseInteractions} />
                        </div>
                    </div>
                </div>
            </main>  )
    };
}


