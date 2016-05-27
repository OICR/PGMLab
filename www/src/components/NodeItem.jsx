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

    this.stateMenuItem = this.stateMenuItem.bind(this);
    this.focusMenuItem = this.focusMenuItem.bind(this);
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
    if (`${newState}` !== this.props.nodeState) {
      this.props.setNodeItemState(this.props.node.name, `${newState}`);
    };
  }
  handleNodeFocus(){
    graphvis.handleNodeFocus(this.props.node);
  }
  handleUnfocusAll(){
    graphvis.unfocusAll();
  }

  // RENDERING
  stateMenuItem(){
    const states = ["-","1","2","3"].map(state=>
      <MenuItem key={state} primaryText={state} onTouchTap={()=>{this.handleNodeState(state)}}/>
    );
    return (<MenuItem primaryText="States"
                      rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>}
                      menuItems={states}
                      onItemTouchTap={this.handleRequestClose}/>);
  }
  focusMenuItem(){
    const focusLabel = graphvis.isFocused(this.props.node) ? "Unhighlight on graph" : "Highlight on graph";
    const focusNode = <MenuItem primaryText={focusLabel} onTouchTap={this.handleNodeFocus}/>;
    const unfocusAll = <MenuItem primaryText="Unhighlight all" onTouchTap={this.handleUnfocusAll}/>;
    return (<MenuItem primaryText="Find in graph"
                      rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>}
                      menuItems={[focusNode, unfocusAll]}
                      onItemTouchTap={this.handleRequestClose}/>);
  }
  render(){
    // console.log(this.props);
    const noPad = {"paddingBottom":"0px","paddingTop":"0px"};
    const itemClass = classNames({"blue-grey lighten-5": this.props.shared}, ["collection-item row"]);
    const nodeName = this.props.node.name;
    const stateLabel = this.props.nodeState;
    return (
      <div className={itemClass} style={noPad}>
        <div className="col s8">{nodeName}</div>
        <div className="col s4">
          <FlatButton onTouchTap={this.handleTouchTap} label={stateLabel} />
          <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}
            anchorOrigin={{horizontal:"left",vertical:"top"}}
            targetOrigin={{horizontal:"left",vertical:"top"}}>
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
