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

    this.observationHeader = this.observationHeader.bind(this);
    this.observationList = this.observationList.bind(this);
  }
  componentDidMount(){
    $(".collapsible").collapsible({accordion: true});
  }
  observationHeader(){
    const setName = this.props.selectedObservationSet.get(this.props.runType).name;
    return (
      <h6>{setName}</h6>
    );
  }
  observationList(){
    const setObservations = this.props.selectedObservationSet.get(this.props.runType).observations;
    const currentActiveObservation = this.props.activeObservation;
    const observations = this.props.selectedObservations.get(this.props.runType).map(
      (observationIndex)=>{
        const active = (currentActiveObservation===observationIndex);
        const itemClass = classNames({
          "active":active
        }, ["collection-item black-text"]);
        return (
          <a key={observationIndex} className={itemClass}>
            <span className="title">{observationIndex}</span>
          </a>
        );
      });
    return (
      <div className="collection">
        {observations}
      </div>
    );
  }
  render(){
    console.log(this.props);
    return (
      <ul className="collapsible" data-collapsible="accordian">
        <li>
          <div className="collapsible-header">
            {this.observationHeader()}
          </div>
          <div className="collapsible-body">
            {this.observationList()}
          </div>
        </li>
      </ul>
    );
  }
}
