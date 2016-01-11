import React from 'react'

import {SideNav} from './Sidenav.jsx'
import {TopNav}  from './Topnav.jsx'

export class Header extends React.Component {
    render () {
        return (
            <header>
               <TopNav />
               <SideNav pathways={this.props.pathways}/>
            </header>
            )
    }
}




