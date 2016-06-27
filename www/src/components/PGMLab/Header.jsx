import React from 'react'

var classNames = require("classnames");
export class Header extends React.Component {
  render(){
    const noMargin = {marginBottom: "0px"}
    return (
      <header className="row" style={noMargin}>
        <nav className="light-blue" role="navigation">
          <div className="nav-wrapper">
            <a className="brand-logo center" href="#!">
              <h4><span style={{color: "#2e7d32"}}>PGMLab</span></h4>
            </a>
          </div>
        </nav>
      </header>
    )
  }
}
