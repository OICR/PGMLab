import React from 'react'

import {Dialog, FlatButton, TextField} from "material-ui";

var classNames = require("classnames");

export class SelectPathways extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pathsMap: this.props.pathwayMap,
      open: false,
      pathwaysText: "",

    };
    this.handleSelect=this.handleSelect.bind(this);
    this.handleCheckAll=this.handleCheckAll.bind(this);
    this.handleUncheckAll=this.handleUncheckAll.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  // For onClick event when hiding/showing all unselected pathways
  handleSelect(pathwayID){
    const selected = this.refs[pathwayID].checked;
    switch (selected) {
      case true:
        this.props.removeSelectedPathways([pathwayID]);
        break;
      case false:
        this.props.selectPathways([pathwayID]);
        break;
    };
  }
  // For onClick event when checking all pathways
  handleCheckAll(){
    const toSelect = [... this.props.pathwayMap.get("All").keys()];
    this.props.selectPathways(toSelect);
  }
  // For onClick event when unchecking all pathways
  handleUncheckAll(){
    const selected = [... this.props.pathwayMap.get("Selected").keys()];
    this.props.removeSelectedPathways(selected);
  }

  // HANDLING
  handlePathwaySelect(pathway){
    // this.props.updatePathwayMap.updatePathwaySelect(pathway);
    const pathsMap = this.state.pathsMap; //same reference so .state is mutated, we don't want this.
    if (pathsMap.get("Selected").has(pathway.id)) {
      pathsMap.get("Selected").delete(pathway.id);
    }
    else {
      pathsMap.get("Selected").set(pathway.id, pathway);
    };
    this.setState({pathsMap});
  }
  handleOpen(){
    // console.log("bopen", this.state.pathsMap.get("Selected").size, this.props.pathwayMap.get("Selected").size);
    this.setState({
      pathsMap: this.props.pathwayMap,
      open:true
    });
  }
  handleCancel(){
    // console.log("bcancel", this.state.pathsMap.get("Selected").size, this.props.pathwayMap.get("Selected").size);
    this.setState({
      open:false
    });
  }
  handleConfirm(){
    // this.props.updatePathwayMap(
    //   this.state.pathsMap,
    //   ()=>{this.setState({open:false})}
    // );
  }

  // RENDERING
  render(){
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={()=>{this.handleCancel()}} />,
      <FlatButton label="Confirm" primary={true} onTouchTap={this.handleConfirm} />
    ];
    const scrollable={maxHeight:"70%", overflow:"scroll"};
    const emptyPrompt = (
      <div className="collection-item">
        {"No pathways to show"}
      </div>
    );
    const pathsMap = this.state.pathsMap;
    console.log(pathsMap.get("Selected"));
    const itemClass = (pathwayID) => {return classNames(
      {"active": pathsMap.get("Selected").has(pathwayID)},
      ["collection-item"]
    )};

    const pathways = [...pathsMap.get("All").values()]
    const pathsList = pathways
      .filter(pathway => pathway.name.toLowerCase().indexOf(this.state.pathwaysText)!==-1)
      .map(pathway => (
        <div  key={pathway.id} className={itemClass(pathway.id)}
              onClick={()=>{this.handlePathwaySelect(pathway)}}>
          {pathway.name}
        </div>
      ));
    return (
      <div>
        <FlatButton label="Pathways" onTouchTap={this.handleOpen}/>
        <Dialog modal={true} open={this.state.open} contentStyle={{overflow:"visible"}}
                actions={actions}>
          <div className="row" style={{height:"500px"}}>
            <div className="col s12" style={{height:"100%"}}>
              <div className="center-align">{"Pathways"}</div>
              <TextField  hintText={"Pathway Name"} floatingLabelText={"Filter"} floatingLabelFixed={true}
                          fullWidth={true} onChange={evt=>{this.setState({pathwaysText: evt.target.value.toLowerCase()})}}/>
              <div className="collection" style={scrollable}>
                {pathsList.length===0 ? emptyPrompt:pathsList}
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
