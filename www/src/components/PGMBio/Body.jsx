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
              observations={this.props.observations}/>
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
