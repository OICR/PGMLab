import React from 'react'

import {Dialog, FlatButton, TextField} from "material-ui";

var classNames = require("classnames");

export class SelectObservationSet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      obsMap: this.props.observationMap,
      open: false,
      setsText: "",
      obsText: "",
    };

    this.obsSetsList = this.obsSetsList.bind(this);
    this.obsList = this.obsList.bind(this);

    this.handleObsSetSelect = this.handleObsSetSelect.bind(this);
    this.handleObsSelect = this.handleObsSelect.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  // HANDLING
  handleObsSetSelect(obsSetID){
    const obsMap = this.state.obsMap;
    const selectedSet = obsMap.get("All").get(obsSetID);
    obsMap.set("Current", new Map([
      ["Set", selectedSet],
      // ["Selected Observations", [...selectedSet.observations.keys()]],
      ["Selected Observations", new Set([...selectedSet.observations.keys()])],
      ["Active Observation", 0]
    ]));
    this.setState({obsMap});
  }
  handleObsSelect(obsIndex){
    const obsMap = this.state.obsMap;
    if (obsMap.get("Current").get("Selected Observations").has(obsIndex)) {
      obsMap.get("Current").get("Selected Observations").delete(obsIndex);
    }
    else {
      obsMap.get("Current").get("Selected Observations").add(obsIndex);
    };
    this.setState({obsMap});
  }
  handleOpen(){
    this.setState({
      obsMap: this.props.observationMap,
      open: true
    });
  }
  handleCancel(){
    console.log(this.props.observationMap);
    console.log(this.state.obsMap);
    this.setState({
      obsMap: this.props.observationMap,
      open:false
    });
  }
  handleConfirm(){
    // Set ObservationMap in App then close
    this.props.updateObservationMap(
      this.state.obsMap,
      ()=>{this.setState({open:false})}
    );
  }
  // RENDERING
  obsSetsList(){
    const emptyPrompt = (
      <div className="collection-item black-text">
        {"No observation sets to show"}
      </div>
    );
    const obsMap = this.state.obsMap;
    const itemClass = obsSetID => classNames(
      {"active": obsMap.get("Current").get("Set").id===obsSetID},
      ["collection-item"]
    );
    const obsSets = [... obsMap.get("All").values()]
      .filter(obsSet => obsSet.name.toLowerCase().indexOf(this.state.setsText)!==-1)
      .map(obsSet => (
        <div  key={obsSet.id} className={itemClass(obsSet.id)}
              onClick={()=>{this.handleObsSetSelect(obsSet.id)}}>
          {obsSet.id}
        </div>
      ));
    const scrollable={maxHeight:"70%", overflow:"scroll"};
    return (
      <div className="collection" style={scrollable}>
        {obsSets.length===0 ? emptyPrompt:obsSets}
      </div>
    );
  }
  obsList(){
    const emptyPrompt = (
      <div className="collection-item center-align">
        {"No observations to show"}
      </div>
    );
    const obsMap = this.state.obsMap;
    const itemClass = obsIndex => classNames(
      {"active": obsMap.get("Current").get("Selected Observations").has(obsIndex)},
      ["collection-item"]
    );
    const obsList = obsMap.get("Current").get("Set").observations
      .filter((obs,index) => `Observation ${index}`.toString().toLowerCase().indexOf(this.state.obsText)!==-1)
      .map((obs,index) => (
        <div  key={index} className={itemClass(index)}
              onClick={evt=>{this.handleObsSelect(index)}}>
          {`Observation ${index}`}
        </div>
      ));
    const scrollable={maxHeight:"70%", overflow:"scroll"};
    return (
      <div className="collection" style={scrollable}>
        {obsList.length===0 ? emptyPrompt:obsList}
      </div>
    )
  }
  render(){
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={()=>{this.handleCancel()}} />,
      <FlatButton label="Confirm" primary={true} onTouchTap={this.handleConfirm} />
    ];
    return (
      <div>
        <FlatButton label="Observations" onTouchTap={this.handleOpen}/>
        <Dialog modal={true} open={this.state.open} contentStyle={{overflow:"visible"}}
                actions={actions}>
            <div className="row" style={{height:"500px"}}>
              <div className="col s6" style={{height:"100%"}}>
                <div className="center-align">{"Observation Sets"}</div>
                <TextField  hintText={"Set Name"} floatingLabelText={"Filter"} floatingLabelFixed={true}
                            fullWidth={true} onChange={evt=>{this.setState({setsText: evt.target.value.toLowerCase()})}}/>
                {this.obsSetsList()}
              </div>
              <div className="col s6 center-align" style={{height:"100%"}}>
                <div>{"Observations"}</div>
                <TextField  hintText={"Observations"} floatingLabelText={"Filter"} floatingLabelFixed={true}
                            fullWidth={true} onChange={evt=>{this.setState({obsText: evt.target.value.toLowerCase()})}}/>
                {this.obsList()}
              </div>
            </div>
        </Dialog>
      </div>
    );
  }
}
