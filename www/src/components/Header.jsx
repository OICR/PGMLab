import React from 'react'

import {UploadModal} from "./UploadModal.jsx";

var classNames = require("classnames");
export class Header extends React.Component {
  componentDidMount(){
    $(".dropdown-button").dropdown();
    $(".tooltipped").tooltip({delay: 25});

  }

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
    const noMargin = {marginBottom: "0px"}
    return (
      <header className="row" style={noMargin}>
        <UploadModal  uploadList                     = {this.props.uploadList}
                      uploadListAddFailure           = {this.props.uploadListAddFailure}
                      addNewPathway                  = {this.props.addNewPathway}
                      addNewObservationSet           = {this.props.addNewObservationSet}
                      addNewEstimatedParameterSet    = {this.props.addNewEstimatedParameterSet}
                      addNewPosteriorProbabilitySet  = {this.props.addNewPosteriorProbabilitySet} />
        <nav className="light-blue" role="navigation">
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              {this.tabs()}
              <li>
                <a  href="#!" onClick={()=>{$("#uploadModal").openModal()}}
                    className="tooltipped" data-position="bottom" data-tooltip="Upload Data Files">
                  <i className="material-icons">file_upload</i>
                </a>
              </li>

            </ul>
            <a className="brand-logo center" href="#!">
              <h4><span style={{color: "#2e7d32"}}>PGMLab</span>{"::"}<span style={{color:"#9c27b0"}}>Bio</span></h4>
            </a>
          </div>
        </nav>
      </header>
    )
  }
}
