import React from 'react'

var classNames = require("classnames");
export default class Header extends React.Component {
  render(){
    const noMargin = {marginBottom: "0px"}
    const color = "#2e7d32";
    return (
      <header className="row" style={noMargin}>
        <nav className="blue darken-1" role="navigation">
          <div className="nav-wrapper">
            <a className="brand-logo center" href="#!">
              <h4><span className="white-text">PGMLab</span></h4>
            </a>
          </div>
        </nav>
      </header>
    )
  }
}
