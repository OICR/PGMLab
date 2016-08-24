import React from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import {red100, red400} from "material-ui/styles/colors";

export default class RunTypeSelect extends React.Component {
  render(){
    const [lStyle, iStyle] = this.props.runType == "Learning" ?
      [{backgroundColor:red400},{backgroundColor:red100}]:
      [{backgroundColor:red100},{backgroundColor:red400}];
    return (
      <div className="row">
        <Tabs
            className="col s12"
            value={this.props.runType}
            onChange={runType => this.props.changeRunType(runType)}>
          <Tab style={lStyle} label="Learning" value="Learning"/>
          <Tab style={iStyle} label="Inference" value="Inference"/>
        </Tabs>
      </div>
    );
  }
}
