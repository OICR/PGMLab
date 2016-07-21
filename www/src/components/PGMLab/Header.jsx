import React from 'react'

class AuthButton extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

  }
}

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <header className="row" style={noVertMargin}>
        <nav className="blue darken-1" role="navigation">
          <div className="nav-wrapper white-text">
            <ul className="left">
              <li>
                <span className="left" style={{paddingLeft: "15px"}}>
                  {`${this.props.auth.getIn(["googleProfile", "name"])}
                    (${this.props.auth.getIn(["googleProfile", "email"])})`}
                </span>
              </li>
            </ul>
            <span className="brand-logo center">
              <h4>{`PGMLab`}</h4>
            </span>
            <ul className="right">
              <li>
                <a target="_blank" href="http://github.com/OICR/PGMLab">Github</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
