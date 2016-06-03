// DisplayPanel: right side of window displaying graph
import React from 'react';

var graphvis = require("../bin/graphvis.js");

export class DisplayPanel extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id="canvas"></div>
    )
  }

};
