// DisplayPanel: right side of window displaying graph
import React from 'react';

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
