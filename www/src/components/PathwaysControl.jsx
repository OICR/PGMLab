import React from 'react';

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (
      <div>
        <div className="section">
          <h5>Active Pathway</h5>
        </div>
      </div>
    );
  }
}
