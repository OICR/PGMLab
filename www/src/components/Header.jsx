import React from 'react'

var classNames = require("classnames");
export class Header extends React.Component {
  handleSetTab(tab){
    this.props.setTab(tab);
    this.tabs = this.tabs.bind(this);
  }

  tabs(){
    return ["Run", "Results"].map(tab => (
      <li key={tab} className={classNames({"active":tab===this.props.tab})}>
        <a href="#!" onClick={()=>{this.handleSetTab(tab)}}>{tab}</a>
      </li>
    ));
  }
  render(){
    return (
      <header className="row">
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper">
            <a className="brand-logo center" href="#!" style={{fontSize:"50px"}}>
              PGMBio
            </a>
            <ul id="nav-mobile" className="left hide-on-med-and-down" style={{width:"175px"}}>
              {this.tabs()}
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down" style={{width:"175px"}}>
                <li><a href="http://github.com/OICR/PGMLab">Git</a></li>
                <li><a href="https://github.com/OICR/PGMLab/wiki">Wiki</a></li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
