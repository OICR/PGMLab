import React from "react"
import OICRlogo from "../../../assets/logos/logo_oicr_transparent.png"

export default class Footer extends React.Component {
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"}
    return (
      <footer className="page-footer blue darken-1" style={noVertMargin}>
        <div className="container">
          <div className="row" style={noVertMargin}>
            <div className="col s12 center-align valign">
              <img src={OICRlogo}  width="150px" alt="OICR" />
            </div>
          </div>
        </div>
      </footer>
    );
  };
}
