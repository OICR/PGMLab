import React from "react";

export class ResultsTableControls extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }

  render(){
    const noVertMargin = {marginBottom: "0px", marginTop: "0px"};
    const idFilter = (
      <div className="row" style={noVertMargin}>
        <form>
          <input id="idFilter" style={{paddingBottom: "0px"}}
            value={this.props.idFilter} type="text" placeholder="Filter by ID"
            onChange={evt => this.props.updateIDFilter(evt.target.value.toLowerCase())} />
        </form>
      </div>
    );
    const typeFilters = (
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
    );
    const statusFilters = (
      <div className="row" style={noVertMargin}>
        <div className="col s1">{"Status:"}</div>
        <div className="col s11">
          <form className="row">
            {
              ["Received", "Started", "Succeeded", "Failed"]
                .map(status => {
                  const lowercase = status.toLowerCase();
                  const statusKey = `task-${lowercase}`;
                  const statusCount = 0;//tasksProps["status"][statusKey];
                  return (
                    <div key={status} className="col s3">
                      <input id={`${lowercase}Filter`} value={statusKey} type="checkbox" className="filled-in"
                        checked={this.props.statusFilters.get(statusKey)}
                        onChange={evt => this.props.updateStatusFilter(evt.target.value)}/>
                      <label htmlFor={`${lowercase}Filter`}>{`${status} (${statusCount})`}</label>
                    </div>
                  );
                })
            }
          </form>
        </div>
      </div>
    );
    const dateSort = (
      <div className="row" style={noVertMargin}>
        <div className="col s1">{"Date:"}</div>
        <div className="col s11">
          <form className="row">
            {
              ["Descending", "Ascending"]
                .map(sort => {
                  const lowercase = sort.toLowerCase();
                  return (
                    <div key={lowercase} className="col s3">
                      <input id={`${lowercase}Order`} name="dateSort" value={lowercase} type="radio"
                        checked={this.props.dateSort===lowercase}
                        onChange={evt => this.props.updateDateSort(evt.target.value)}/>
                      <label htmlFor={`${lowercase}Order`}>{`${sort}`}</label>
                    </div>
                  );
                })
            }
          </form>
        </div>
      </div>
    );
    return (
      <div className="card-panel" style={noVertMargin}>
        {idFilter}
        {typeFilters}
        {statusFilters}
        {dateSort}
      </div>
    );
  };
}
