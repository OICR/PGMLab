import React from 'react'


export class TopNav extends React.Component {
    render () {
        return (
            <nav className="light-blue lighten-1 row" role="navigation"> 
                <ul className="col s7 m7 l7">
                    <li><a id="side-nav-open-menu" href="#"><i className="mdi-navigation-menu"></i></a></li>
                    <li><a style={{fontSize:"50px"}} id="logo-container" href="#" className="brand-logo"><span style={{color: "#2e7d32"}}>PGM</span><span style={{color:"#9c27b0"}}>Bio</span></a>
                        <p style={{paddingTop:"17px",marginTop:"15px"}}>A probabilistic model to measure the impact of mutation on pathways compents</p>
                    </li>
                </ul>
                <ul className="col s5 pull-s7"> 
                    <li><a href="http://github.com/OICR/PGMLab-GUI">Code</a></li> 
                    <li><a href="https://github.com/OICR/PGMLab-GUI/wiki">Wiki</a></li> 
               </ul> 
            </nav> )
    };
}
