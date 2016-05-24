import React from "react";

import {FlatButton, Popover, Menu, MenuItem, IconButton} from "material-ui";

export class NodeItem extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
    this.state={
      open:false,
      nodeName:props.node.name,
      nodeState: '-1'
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleStateSet = this.handleStateSet.bind(this);
  }
  handleTouchTap(event){
    this.setState({
      open:true,
      anchorEl:event.currentTarget
    });
  }
  handleRequestClose(){
    this.setState({open:false});
  }
  handleStateSet(newState){
    console.log(this.props.activeType,"changing state:",this.state.nodeState,newState);
    this.setState({
      nodeState: newState
    }, ()=>{this.props.setNodeItemState(this.props.node, newState, this.props.activeType)});
    this.handleRequestClose();
  }
  render(){
    // console.log(this.props)
    const noPad = {"paddingBottom":"0px","paddingTop":"0px"};
    return (
      <div className="collection-item row" style={noPad}>
        <div className="col s9">
          {this.state.nodeName}
        </div>
        <div className="col s3">
          <FlatButton onTouchTap={this.handleTouchTap} label={this.state.nodeState} />
          <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.handleRequestClose}
            anchorOrigin={{horizontal:"left",vertical:"top"}}
            targetOrigin={{horizontal:"right",vertical:"top"}}>
            <Menu value={this.state.nodeState} onChange={(evt,value)=>{this.handleStateSet(value)}} selectedMenuItemStyle={{color:"black"}}>
            <MenuItem value={1} primaryText="1"/>
            <MenuItem value={2} primaryText="2"/>
            <MenuItem value={3} primaryText="3"/>
            </Menu>
          </Popover>
        </div>
      </div>
    );
  }
}
