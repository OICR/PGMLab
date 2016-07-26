import React from 'react'

import GoogleLogin from "react-google-login";
import {UploadModal} from "./UploadModal.jsx";
import {UploadModal2} from "./UploadModal2.jsx";

var classNames = require("classnames");

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.getLeftTabs = this.getLeftTabs.bind(this);
  }
  componentDidMount(){
    $(".tooltipped").tooltip({delay: 25});
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
  getLeftTabs(){
    return (
      <ul className="left">
        {
          ["Run", "Results"].map(tab => (
            <li key={tab} className={classNames({"active":tab===this.props.tab})}>
              <a href="#!" onClick={()=>{this.handleSetTab(tab)}}>{tab}</a>
            </li>
          ))
        }
        <li>
          <UploadModal  uploadList                     = {this.props.uploadList}
                        uploadListAddFailure           = {this.props.uploadListAddFailure}
                        addNewPathway                  = {this.props.addNewPathway}
                        addNewObservationSet           = {this.props.addNewObservationSet}
                        addNewEstimatedParameterSet    = {this.props.addNewEstimatedParameterSet}
                        addNewPosteriorProbabilitySet  = {this.props.addNewPosteriorProbabilitySet} />
        </li>
        <li>
          <UploadModal2 uploadFile = {this.props.uploadFile}/>
        </li>
      </ul>
    )
  }

  handleSetTab(tab){
    this.props.setTab(tab);
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
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}