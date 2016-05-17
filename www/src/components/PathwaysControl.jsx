import React from 'react';

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);
  }

  pathwayList(){
    return (
      <div className="row">
        <div className="col s12 collection">

        </div>
      </div>
    );
  }
  render(){
    console.log(this.props);
    return (
      <div>
        <div className="section">
          <h5>Active Pathway</h5>
          <div className="row">
            <div className="col s12">
              <form>
                <input type="text" />
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
