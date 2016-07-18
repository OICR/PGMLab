import React from 'react'

import OICRlogo from "../../../assets/logos/logo_oicr_transparent.png"

export default class Footer extends React.Component {
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <footer className="page-footer blue darken-1" style={noVertMargin}>
        <div className="row" style={noVertMargin}>
          <div className="col s8">
            <img src={OICRlogo}  width="150px" alt="oicr logo" />
            <br/>
            <strong className="white-text">Informatics and Bio-Computing - Machine Learning Group</strong>
          </div>
          <div className="col s2">
            <ul>
              <li><a className="white-text" href="http://github.com/OICR/PGMLab">Git</a></li>
              <li><a className="white-text" href="https://github.com/OICR/PGMLab/wiki">Wiki</a></li>
            </ul>
          </div>
          <div className="col s2 right-align">
            <h5 className="white-text">Contact</h5>
            <ul>
              <li><a className="white-text" href="#!">Hossein Radfar</a></li>
              <li><a className="white-text" href="#!">Adam Wright</a></li>
              <li><a className="white-text" href="#!">Martin Pham</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
}
