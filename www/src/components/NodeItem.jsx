import React from "react";

import {FlatButton, Popover, Menu, MenuItem, FontIcon} from "material-ui";

var classNames = require("classnames");
var graphvis = require("./../bin/graphvis.js");

export class NodeItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open:false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleNodeState = this.handleNodeState.bind(this);

    this.handleNodeFocus = this.handleNodeFocus.bind(this);
    this.handleUnfocusAll = this.handleUnfocusAll.bind(this);
  }
  handleTouchTap(event){
    this.setState({open:true,
      anchorEl:event.currentTarget
    });
  }
  handleRequestClose(){
    this.setState({open:false});
  }
  handleNodeState(newState){
    // console.log("changing state:",newState);
    if (`${newState}` !== this.props.nodeState) {
      this.props.setNodeItemState(this.props.node.name, `${newState}`);
    };
    // this.handleRequestClose();
  }
  handleNodeFocus(){
    graphvis.focusNode(this.props.node);
    // this.handleRequestClose();
  }
  handleUnfocusAll(){
    graphvis.unfocusAll();
    // this.handleRequestClose();
  }

  // RENDERING
  stateMenuItem(){
    const states = ["-","1","2","3"].map(state=>
      <MenuItem key={state} primaryText={state} onTouchTap={()=>{this.handleNodeState(state)}}/>
    );
    return <MenuItem primaryText="States" rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} menuItems={states} />
  }
  focusMenuItem(){
    const focusNode = <MenuItem primaryText={this.state.focused ? "Unhighlight on graph" : "Highlight on graph"} onTouchTap={this.handleNodeFocus}/>;
    const unfocusAll = <MenuItem primaryText="Unhighlight all" onTouchTap={this.handleUnfocusAll}/>
    return <MenuItem primaryText="Find in graph" rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>} menuItems={[focusNode, unfocusAll]} />
  }
  render(){
    // console.log(this.props);
    const noPad = {"paddingBottom":"0px","paddingTop":"0px"};
    const nodeName = this.props.node.name;
    const nodeState = this.props.nodeState;
    const itemClass = classNames({"blue-grey lighten-5": this.props.shared}, ["collection-item row"]);
    return (
      <div className={itemClass} style={noPad}>
        <div className="col s9">{nodeName}</div>
        <div className="col s3">
          <FlatButton onTouchTap={this.handleTouchTap} label={nodeState} />
          <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}
            anchorOrigin={{horizontal:"left",vertical:"top"}}
            targetOrigin={{horizontal:"right",vertical:"top"}}>
            <Menu desktop={true}>
              {this.stateMenuItem()}
              {this.focusMenuItem()}
            </Menu>
          </Popover>
        </div>
      </div>
    );
  }
}
