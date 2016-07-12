import React from "react";
var moment = require("moment");

export class TableControls extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }

  render(){
    const noVertMargin = {marginBottom: "0px", marginTop: "0px"};
    return (
      <div className="card-panel" style={noVertMargin}>
        <div className="row" style={noVertMargin}>
          <form>
            <input id="idFilter" style={{paddingBottom: "0px"}}
              value={this.props.idFilter} type="text" placeholder="Filter by ID"
              onChange={evt => this.props.updateIDFilter(evt.target.value.toLowerCase())} />
          </form>
        </div>
        <div className="row" style={noVertMargin}>
          <div className="col s1 valign">{"Type:"}</div>
          <div className="col s11 valign">
            <form className="row">
              {
                ["Learning", "Inference"]
                  .map(type => {
                    const typeCount = 0;
                    const lowercase = type.toLowerCase();
                    return (
                      <div key={lowercase} className="col s3 valign">
                        <input id={`${lowercase}Filter`} value={lowercase}
                            type="checkbox" className="filled-in"
                            checked={this.props.typeFilters.get(lowercase)}
                            onChange={evt => this.props.updateTypeFilter(evt.target.value)}/>
                        <label htmlFor={`${lowercase}Filter`}>{`${type} (${typeCount})`}</label>
                      </div>
                    )
                  })
              }
            </form>
          </div>
        </div>
      </div>
    );
  };
}
