import React from "react";

import {Menu, MenuItem, Paper} from "material-ui";

export class PosteriorProbabilitiesControl extends React.Component {
  constructor(props){
    super(props);

    this.showPostProbs = this.showPostProbs.bind(this);
    this.postProbsSetList = this.postProbsSetList.bind(this);
    this.postProbsList = this.postProbsList.bind(this);
  }

  showPostProbs(id, index){
    console.log("showPostProbs:", id, index);
    this.props.setActivePosteriorProbability(id,index);
  }

  // RENDERING
  postProbsList(postProbs){
    return postProbs.map((pp,index) => <MenuItem key={index} primaryText={index} />);
  }
  postProbsSetList(){
    const posteriorProbabilities = this.props.posteriorProbabilities;
    const all = posteriorProbabilities.get("All");
    const setList = [...all].map((pair)=>{return {id:pair[0],results:pair[1]}})
      .map(pp => {
        console.log("pp", pp);
        const menuItems = pp.results.map((obj, index)=>{
          return (
            <MenuItem key={index} primaryText={`Observation ${index}`}
              onTouchTap={()=>{this.showPostProbs(pp.id,index)}}/>
          );
        });
        return (
          <MenuItem key={pp.id} primaryText={pp.id} menuItems={menuItems}/>
        );
      });
    return setList;
  }
  render(){
    console.log(this.props.posteriorProbabilities);
    return (
      <div className="section">
        <h5>Posterior Probabilities</h5>
        <div className="row">
            <Menu desktop={true}>
              <MenuItem primaryText={"Reset"} />
              {this.postProbsSetList()}
            </Menu>
        </div>
      </div>
    );
  }
}
