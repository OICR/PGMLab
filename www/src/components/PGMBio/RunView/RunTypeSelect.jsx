import React from "react";

export default class RunTypeSelect extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $("ul.tabs").tabs();
  }
  render(){
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6">
              <a href="#learning">{"Learning"}</a>
            </li>
            <li className="tab col s6">
              <a href="#inference">{"Inference"}</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
