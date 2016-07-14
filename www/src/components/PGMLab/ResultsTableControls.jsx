import React from "react";

export default class ResultsTableControls extends React.Component {
  constructor(props){
    super(props);
    this.clusterTasks = this.clusterTasks.bind(this);
  }
  // Count different types of tasks to display next to filters
  clusterTasks(){
    return this.props.tasks
      .filter(t => t.get("task_id").includes(this.props.idFilter))
      .reduce(
        (clusters, t) => {
          clusters["typeCount"][t.get("task_type")]++;
          clusters["statusCount"][t.get("status")]++;
          return clusters;
        },{
          typeCount: {"learning":0,"inference":0},
          statusCount: {"task-received":0,"task-started":0,"task-succeeded":0,"task-failed":0}
        }
      );
  }

  render(){
    const noVertMargin = {marginBottom: "0px", marginTop: "0px"};
    const noVertPadding = {paddingBottom: "0px", paddingTop: "0px"};
    const {typeCount, statusCount} = this.clusterTasks();
    const idFilter = (
      <div className="row" style={noVertMargin}>
        <form className="row">
          <input id="idFilter" style={{paddingBottom: "0px"}} className="col s12"
            value={this.props.idFilter} type="text" placeholder="Filter by ID"
            onChange={evt => this.props.updateIDFilter(evt.target.value.toLowerCase())} />
        </form>
      </div>
    );
    const typeFilters = (
      <div className="row" style={noVertMargin}>
        <div className="col s1 valign grey-text">{"Type:"}</div>
        <div className="col s11 valign">
          <form className="row">
            {
              ["Learning", "Inference"]
                .map(type => {
                  const lowercase = type.toLowerCase();
                  return (
                    <div key={lowercase} className="col s3 valign">
                      <input id={`${lowercase}Filter`} value={lowercase}
                          type="checkbox" className="filled-in"
                          checked={this.props.typeFilters.get(lowercase)}
                          onChange={evt => this.props.updateTypeFilter(evt.target.value)}/>
                        <label className="black-text" htmlFor={`${lowercase}Filter`}>{`${type} (${typeCount[lowercase]})`}</label>
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
        <div className="col s1 grey-text">{"Status:"}</div>
        <div className="col s11">
          <form className="row">
            {
              ["Received", "Started", "Succeeded", "Failed"]
                .map(status => {
                  const lowercase = status.toLowerCase();
                  const statusKey = `task-${lowercase}`;
                  return (
                    <div key={status} className="col s3">
                      <input id={`${lowercase}Filter`} value={statusKey} type="checkbox" className="filled-in"
                        checked={this.props.statusFilters.get(statusKey)}
                        onChange={evt => this.props.updateStatusFilter(evt.target.value)}/>
                      <label className="black-text" htmlFor={`${lowercase}Filter`}>{`${status} (${statusCount[statusKey]})`}</label>
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
        <div className="col s1 grey-text">{"Date:"}</div>
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
                      <label className="black-text" htmlFor={`${lowercase}Order`}>{`${sort}`}</label>
                    </div>
                  );
                })
            }
          </form>
        </div>
      </div>
    );
    return (
      <div className="card-panel z-depth-0" style={Object.assign({},noVertMargin,noVertPadding)}>
        {idFilter}
        {typeFilters}
        {statusFilters}
        {dateSort}
      </div>
    );
  };
}
