import React from "react";
import RunView from "./RunView/RunView.jsx";

export default class Body2 extends React.Component {
    constructor(props){
      super(props);
      this.getView = this.getView.bind(this);
    }
    getView(){
      switch (this.props.view) {
        case "Run":
          return (
            <RunView
              observations={this.props.observations}
              dataspace={this.props.dataspace}
              selectObservationSet={this.props.selectObservationSet}
              selectObservations={this.props.selectObservations}
            />
          )
      }
    }
    render(){
      return (
        <main>
          {this.getView()}
        </main>
      )
    }
}
