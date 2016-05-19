import React from 'react';

export class PathwaysControl extends React.Component {
  constructor(props){
    super(props);

    this.header = this.header.bind(this);
    this.nodeItem = this.nodeItem.bind(this);
    this.nodeList = this.nodeList.bind(this);
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
  nodeItem(node){
    const name = node.name;
    const value = node.value;
    return (
      <div className="collection-item row">
        <div className="col s10 valign">{name}</div>
        <div className="btn col s2" data-activates={name}>
            {value}
        </div>
        <ul id={name} className="dropdown-content">
          <li><a>0</a></li>
          <li><a>1</a></li>
          <li><a>2</a></li>
        </ul>
      </div>
    );
  }
  nodeList(){
  }
  render(){
    // console.log(this.props);
    return (
      <div>
        <div className="section">
          <h5>Active Pathway</h5>
          {this.header()}
          <div className="collection" style={{"height":"200px","overflow":"scroll"}}>
            <div className="collection-item">
              <input type="text" placeholder="Type to filter nodes" />
            </div>
            {this.nodeItem({name:"IL5",value:"0"})}
            {this.nodeItem({name:"IL3RA",value:"-"})}
            {this.nodeItem({name:"IL5RA",value:"1"})}
          </div>
        </div>
      </div>
    );
  }
}
