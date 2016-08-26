import React from "react"
import {List, ListItem} from "material-ui/List"
import {Map} from "immutable"

import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

// These components have stateful data containing whether to display pathways or observations
class DataspaceSelect extends React.Component {
  render(){
    const [pStyle,oStyle] = this.props.viewData=="Pathway" ?
      [{fontWeight:"bold"},{}]:[{},{fontWeight:"bold"}]
    return (
      <div className="center-align col s12">
        <div>{"View data: "}
          <a href="#" style={pStyle} onClick={evt => this.props.changeViewData("Pathway")}>
            {"Pathways"}
          </a>
          {" / "}
          <a href="#" style={oStyle} onClick={evt => this.props.changeViewData("Observation")}>
            {"Observations"}
          </a>
        </div>
      </div>
    )
  }
}

const getName = p => p.has("name") ? p.get("name") : p.get("filename")
const getID = p => p.has("id") ? p.get("id") : p.get("_id")
const getLabel = p => getName(p).length > 35 ? getName(p).substr(0,35).concat("...") : getName(p)
class PathwayData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewPathway: null //ID of pathway
    }
    this.getPathwayChildren = this.getPathwayChildren.bind(this);
    this.getPathwayList = this.getPathwayList.bind(this);
  }
  getPathwayChildren(){
    return (
      this.props.dataspace.get("pathways")
        .valueSeq()
        .sort((a,b) => {
          const [aName, bName] = [a,b].map(p => getName(p).toLowerCase());
          switch (true) {
            case aName < bName: return -1
            case aName > bName: return 1
            default: return 0
          };
        })
        .map(p => <MenuItem key={getID(p)} value={getID(p)} primaryText={getName(p)} autoWidth={false} label={getLabel(p)}/>)
    )
  }
  getPathwayList(){
    return (
      this.props.dataspace.getIn(["pathways", this.state.viewPathway, "data", "nodes"])
        .valueSeq()
        .map(n =>
          <ListItem key={n.get("name")}
              primaryText={n.get("longname", "No longname available")}
              secondaryText={n.get("name")}
          />)
    )
  }
  render(){
    return (
      <div className="col s12 center-align">
        <SelectField
            fullWidth={true} autoWidth={true} hintText="View nodes in a pathway"
            value={this.state.viewPathway}
            onChange={(evt, idx, viewPathway) => {this.setState({viewPathway})}}
            children={this.getPathwayChildren()}
        />
        {
          this.props.dataspace.hasIn(["pathways", this.state.viewPathway]) ?
            <List
                style={{maxHeight:"300px",overflowY:"scroll"}}
                children={this.getPathwayList()}
            />
            : null
        }
      </div>
    )
  }
}

class ObservationData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewObservation: null //index of observation
    }
    this.getObservationChildren = this.getObservationChildren.bind(this)
    this.getObservationList = this.getObservationList.bind(this)
  }
  getObservationChildren(){
    return (
      this.props.dataspace.getIn(["observationSet", "selected"])
        .reduce((observations, selected, i) => !selected ? observations :
          [...observations,
            <MenuItem key={i} value={`${i}`} label={`Observation ${i+1}`} primaryText={`Observation ${i+1}`} />
          ],
          [])
    )
  }
  getObservationList(){
    return (
      this.props.dataspace.getIn(["observationSet", "data", this.state.viewObservation])
        .valueSeq()
        .map(n =>
          <ListItem key={n.get("name")}
              primaryText={n.get("name")} secondaryText={`State: ${n.get("state")}`}
          />)
    )
  }
  render(){
    return (
      <div className="col s12 center-align">
        <SelectField
            fullWidth={true} autoWidth={true} hintText="View observed node states"
            value={this.state.viewObservation}
            onChange={(evt, idx, viewObservation) => {this.setState({viewObservation})}}
            children={this.getObservationChildren()}
        />
        {
          this.props.dataspace.getIn(["observationSet", "selected", this.state.viewObservation]) ?
            <List
              style={{maxHeight:"300px",overflowY:"scroll"}}
              children={this.getObservationList()}
            />
            : null
        }
      </div>
    )
  }
}

export default class DataspaceControl extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewData: "Pathway"
    };
    this.changeViewData = viewData => this.setState({viewData})
  }
  render(){
    const showDataspace = this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet");
    const [pStyle,oStyle] = this.state.viewData=="Pathway" ?
      [{},{display:"none"}]:[{display:"none"},{}];
    return (
      <div>
        <div className="row">
          <DataspaceSelect viewData={this.state.viewData} changeViewData={this.changeViewData} />
        </div>
        <Paper className="row">
          <div style={pStyle}>
            <PathwayData dataspace={this.props.dataspace}/>
          </div>
          <div style={oStyle}>
            <ObservationData dataspace={this.props.dataspace}/>
          </div>
        </Paper>
      </div>
    )
  }
}
