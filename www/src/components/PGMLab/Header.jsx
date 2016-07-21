import React from 'react'

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.getSignOutBtn = this.getSignOutBtn.bind(this);
  }
  getSignOutBtn(){
    return (
      !this.props.auth.get("signedIn") ? null :
      <li>
        <a href="#" onClick={evt => this.props.signOut()}>
          <span>{"Sign Out"}</span>
          <i className="material-icons right">exit_to_app</i>
        </a>
      </li>
    );
  }
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <header className="row" style={noVertMargin}>
        <nav className="blue darken-1" role="navigation">
          <div className="nav-wrapper">
            <span className="brand-logo center">
              <h4>{`PGMLab`}</h4>
            </span>
            <ul className="right">
              <li>
                <a target="_blank" href="http://github.com/OICR/PGMLab">Github</a>
              </li>
              {this.getSignOutBtn()}
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
