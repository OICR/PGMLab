import React from 'react'


export class TopNav extends React.Component {
    render () {
        var activePathwayName = this.props.activePathway.name;
        return (
            <nav className="light-blue lighten-1" role="navigation"> 
                <div className="nav-wrapper"> 
                    <ul className="right "> 
                        <li><a href="http://github.com/OICR/PGMLab-GUI">Code</a></li> 
                        <li><a href="https://github.com/OICR/PGMLab-GUI/wiki">Wiki</a></li> 
                    </ul> 
                    <ul className="left">
                        <li><a id="side-nav-open" href="#"><i className="mdi-navigation-menu"></i></a></li>
                        <li><a id="logo-container" href="#" className="brand-logo">Genome Network Analysis: {activePathwayName}</a></li>
                    </ul>
                </div>
            </nav> )
    };
}
