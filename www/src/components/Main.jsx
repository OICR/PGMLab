import React from 'react'

import {Content} from './Content.jsx'

export class Main extends React.Component {
    render () {
console.log(this.props.pathways, "main");
        return (
           <main>
                <div className="container" className="col l12">
                    <div className="row">
                        <div className="col s12 m9 l10">
                            <Content pathways={this.props.pathways} />
                        </div>
                    </div>
                </div>
            </main>  )
    };
}


