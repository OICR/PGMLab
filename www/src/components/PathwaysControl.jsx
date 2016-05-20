import React from 'react';

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);

    this.header = this.header.bind(this);
  }

  header(){
    const activePathway = {
      name: "G-protein:gamma signalling"
    };
    const name = activePathway.name;
    return (
      <ul className="pagination">
        <li className="waves-effect blue lighten-5"><a><i className="material-icons">chevron_left</i></a></li>
        <li className="waves-effect blue lighten-5"><a><i className="material-icons">chevron_right</i></a></li>
        <li><a><i className="material-icons">search</i></a></li>
        <li><strong>{name}</strong></li>
      </ul>
    );
  }
  nodeList(){
  }
  render(){
    console.log(this.props);
    return (
      <div className="section">
        <h5>Active Pathway</h5>
        {this.header()}
        <div className="collection" style={{"height":"200px","overflow":"scroll"}}>
          <div className="collection-item">
            <input type="text" placeholder="Type to filter nodes" />
          </div>
          {this.nodeList()}
        </div>
      </div>
    );
  }
}
