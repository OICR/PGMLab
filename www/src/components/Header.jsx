import React from 'react'

import {SideNav} from './Sidenav.jsx'
import {TopNav}  from './Topnav.jsx'

export class Header extends React.Component {
    render () {
        return (
            <header className="row">
               <TopNav activePathway={this.props.activePathway} />
               <SideNav setActivePathway={this.props.setActivePathway} activePathway={this.props.activePathway} pathways={this.props.pathways}/>
            </header>
            )
    }
}




