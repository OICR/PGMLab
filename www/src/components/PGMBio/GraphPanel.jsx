// GraphPanel: right side of window displaying graph
import React from 'react';

var graphvis = require("../../lib/graphvis.js");

export default class GraphPanel extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="card-panel">
        <div id="canvas"></div>
      </div>
    )
  }

};
