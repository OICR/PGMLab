import React from 'react'
import GoogleLogin from "react-google-login"

import UploadModal from "./UploadModal.jsx"

class LeftHeaderLinks extends React.Component {
  render(){
    return (
      <ul className="left">
        <li key={"Run"}>
          <a href="#" onClick={evt=>this.props.changeView("Run")}>{"Run"}</a>
        </li>
        <li key={"Results"}>
          <a href="#" onClick={evt=>this.props.changeView("Results")}>{`Results (${this.props.resultsCount})`}</a>
        </li>
        <li>
          <UploadModal
              auth={this.props.auth}
              uploads={this.props.uploads}
              onUploadSuccess = {this.props.onUploadSuccess}
              uploadModalOpen = {this.props.uploadModalOpen}
              toggleUploadModal = {this.props.toggleUploadModal}
          />
        </li>
      </ul>
    )
  }
}

class RightHeaderLinks extends React.Component {
  render(){
    const links = {
      Wiki:"http://oicr.github.io/PGMLab/",
      Github:"http://github.com/OICR/PGMLab"
    }
    return (
      <ul className="right">
        {
          Object.keys(links)
            .map(key =>
              <li key={key}>
                <a href={links[key]} target="_blank">{`${key}`}</a>
              </li>
            )
        }
        {
          !this.props.auth.get("signedIn") ? null :
            <li>
              <a href="#" onClick={evt => this.props.signOut()}>
                <span>{"Sign Out"}</span>
              </a>
            </li>
        }
      </ul>
    )
  }
}

export default class Header extends React.Component {
  render(){
    return (
      <header className="row" style={{marginTop:"0px",marginBottom:"0px"}}>
        <nav className="light-blue" role="navigation">
          <div className="nav-wrapper">
            <LeftHeaderLinks {...this.props} />
            <span className="brand-logo center"><h4>{"PGMBio"}</h4></span>
            <RightHeaderLinks auth={this.props.auth} signOut={this.props.signOut} />
          </div>
        </nav>
      </header>
    )
  }
}
