import React from 'react'

export default class Header extends React.Component {
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <header className="row" style={noVertMargin}>
        <nav className="blue darken-1" role="navigation">
          <div className="nav-wrapper">
            <a className="brand-logo center">
              <h4><span className="white-text">PGMLab</span></h4>
            </a>
            <ul className="right">
              <li>
                <a className="white-text" target="_blank" href="http://github.com/OICR/PGMLab">Github</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
