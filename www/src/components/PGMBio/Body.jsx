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
                dataspace={this.props.dataspace}
                observations={this.props.observations}
                selectObservationSet={this.props.selectObservationSet}
                selectObservations={this.props.selectObservations}
                pathways={this.props.pathways}
                selectPathways={this.props.selectPathways}

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
