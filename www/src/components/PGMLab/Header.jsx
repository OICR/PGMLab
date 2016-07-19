import React from 'react'

export default class Header extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.auth.get("googleProfile").get("name"));
  }
  render(){
    const noVertMargin = {marginTop:"0px",marginBottom:"0px"};
    return (
      <header className="row" style={noVertMargin}>
        <nav className="blue darken-1" role="navigation">
          <div className="nav-wrapper white-text">
            <span className="left" style={{paddingLeft: "15px"}}>
              {`${this.props.auth.getIn(["googleProfile", "name"])}
                (${this.props.auth.getIn(["googleProfile", "email"])})`}
            </span>
            <a className="brand-logo center">
              <h4><span>PGMLab</span></h4>
            </a>
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
