import React from 'react'

import {NodeList} from './NodeList.jsx'
import {ObservedNodeList} from './ObservedNodeList.jsx'

import {SelectPathways} from './SelectPathways.jsx'
import {SelectedPathways} from './SelectedPathways.jsx'
import {SelectObservation} from './SelectObservation.jsx'

var classNames = require("classnames");

export class ObservationsControl extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (
      <div className="section">
        <h5>Active Observation</h5>
      </div>
    );
  }
}
