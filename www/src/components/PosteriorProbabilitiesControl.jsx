import React from "react";

export class PosteriorProbabilitiesControl extends React.Component {
  constructor(props){
    super(props);

    this.showPostProbs = this.showPostProbs.bind(this);
  }

  showPostProbs(id, index){
    console.log("showPostProbs:", id, index);
  }

  render(){
    console.log(this.props.posteriorProbabilities);
    return (
      <div className="section">
        <div className="row">
          
        </div>
      </div>
    );
  }
}
