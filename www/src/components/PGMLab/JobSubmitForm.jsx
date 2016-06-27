import React from "react"
// import 'rc-tabs/assets/index.css'
// import Tabs, { TabPane } from 'rc-tabs'
import {InferenceSubmit} from "./InferenceSubmit.jsx"
import {LearningSubmit} from "./LearningSubmit.jsx"

export class JobSubmitForm extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    $("ul.tabs").tabs();
  }
  render(){
    return (
      <div className="col s4">
        <div className="row">
          <div className="col s12">
            <ul className="tabs grey lighten-4">
              <li className="tab col s6"><a href="#Learning">Learning</a></li>
              <li className="tab col s6"><a href="#Inference">Inference</a></li>
            </ul>
          </div>
          <div id="Learning" className="col s12">
            <LearningSubmit />
          </div>
          <div id="Inference" className="col s12">
            <InferenceSubmit />
          </div>
        </div>
      </div>
    );
  }
}
