import React from 'react'

export class TopNav extends React.Component {
    render () {
        return (
            <nav className="light-blue lighten-1" role="navigation"> 
                <div className="nav-wrapper">
                    <a style={{fontSize:"50px"}}  clasName="brand-logo center" href="#"><span style={{color: "#2e7d32"}}>PGM</span><span style={{color:"#9c27b0"}}>Lab</span></a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down" style={{width:"175px"}}> 
                        <li><a href="http://github.com/OICR/PGMLab-GUI">Code</a></li> 
                        <li><a href="https://github.com/OICR/PGMLab-GUI/wiki">Wiki</a></li> 
                    </ul> 
                </div>
            </nav> )
    }
}
