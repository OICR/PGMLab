import React from 'react'

import GoogleLogin from "react-google-login";
import UploadModal from "./UploadModal.jsx";

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.getLeftTabs = this.getLeftTabs.bind(this);
    this.getSignOutBtn = this.getSignOutBtn.bind(this);
  }
  getLinkBtns(){
    const links = {
      "Wiki":"http://oicr.github.io/PGMLab/",
      "Github":"http://github.com/OICR/PGMLab"
    };
    return Object.keys(links)
      .map(k => (
        <li key={k}>
          <a href={links[k]} target="_blank">{`${k}`}</a>
        </li>
      ));
  }
  getSignOutBtn(){
    return (
      !this.props.auth.get("signedIn") ? null :
      <li>
        <a href="#" onClick={evt => this.props.signOut()}>
          <span>{"Sign Out"}</span>
        </a>
      </li>
    );
  }
  getLeftTabs(){
    return (
      <ul className="left">
        {
          ["Run", "Results"].map(view =>
            <li key={view}>
              <a href="#!" onClick={evt=>this.props.changeView(view)}>{view}</a>
            </li>
          )
        }
        <li>
          <UploadModal onUploadSuccess = {this.props.onUploadSuccess} uploads={this.props.uploads} auth={this.props.auth} />
        </li>
      </ul>
    )
  }

  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <header className="row" style={noVertMargin}>
        <nav className="light-blue" role="navigation">
          <div className="nav-wrapper">
            {this.getLeftTabs()}
            <span className="brand-logo center">
              <h4>{"PGMBio"}</h4>
            </span>
            <ul className="right">
              {this.getLinkBtns()}
              {this.getSignOutBtn()}
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
