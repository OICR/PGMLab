import React from 'react'


export class TopNav extends React.Component {
    render () {
        return (
            <nav className="light-blue lighten-1" role="navigation" style={{height:"80px"}}> 
                <div className="nav-wrapper" > 
                    <ul className="right "> 
                        <li><a href="http://github.com/OICR/PGMLab-GUI">Code</a></li> 
                        <li><a href="https://github.com/OICR/PGMLab-GUI/wiki">Wiki</a></li> 
                    </ul> 
                    <ul className="left">
                        <li><a id="side-nav-open-menu" href="#"><i className="mdi-navigation-menu"></i></a></li>
                        <li><a style={{fontSize:"50px"}} id="logo-container" href="#" className="brand-logo"><span style={{color: "#2e7d32"}}>Path</span><span style={{color:"#9c27b0"}}>Mut</span></a>
                            <p style={{paddingTop:"17px",marginTop:"15px"}}>A probabilistic model to measure the impact of mutation on pathways compents</p>
                        </li>
                    </ul>
                </div>
            </nav> )
    };
}
