import React from "react";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {List, ListItem} from "material-ui/List";
import {Map} from "immutable";

class DataspaceSelect extends React.Component {
  render(){
    const [pStyle,oStyle] = this.props.viewData=="Pathway" ?
      [{fontWeight:"bold"},{}]:[{},{fontWeight:"bold"}];
    return (
      <div className="center-align col s12">
        {
          this.props.showDataspace ?
          <div>{"View data by: "}
            {
              <a href="#" style={pStyle} onClick={evt => this.props.changeViewData("Pathway")}>
                {"Pathways"}
              </a>
            }{" / "}
            {
              <a href="#" style={oStyle} onClick={evt => this.props.changeViewData("Observation")}>
                {"Observations"}
              </a>
            }
          </div> : <span>{"Click on links above to choose data for PGMLab"}</span>
        }
      </div>
    )
  }
}

const getName = p => p.has("name") ? p.get("name") : p.get("filename")
const getID = p => p.has("id") ? p.get("id") : p.get("_id")
const getLabel = p => getName(p).length > 35 ? getName(p).substr(0,35).concat("...") : getName(p)
class PathwayData extends React.Component {
  constructor(props){
    super(props);
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
  getPathwaysList(){
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
            fullWidth={true} autoWidth={true} hintText="Select a pathway"
            value={this.state.viewPathway}
            onChange={(evt, idx, viewPathway) => {this.setState({viewPathway})}}
            children={this.getPathwayChildren()}
        />
        {
          !this.props.dataspace.hasIn(["pathways", this.state.viewPathway]) ? null :
            <List
                style={{maxHeight:"300px",overflowY:"scroll"}}
                children={this.getPathwaysList()}
            />
        }
      </div>
    )
  }
}

class ObservationData extends React.Component {
  constructor(props){
    super(props);
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
        .map(n => <ListItem key={n.get("name")} primaryText={n.get("name")} secondaryText={n.get("state")}/>)
    )
  }
  render(){
    return (
      <div className="col s12 center-align">
        <SelectField
            fullWidth={true} autoWidth={true} hintText="Select an observation"
            value={this.state.viewObservation}
            onChange={(evt, idx, viewObservation) => {this.setState({viewObservation})}}
            children={this.getObservationChildren()}
        />
        {
          !this.props.dataspace.getIn(["observationSet", "selected", this.state.viewObservation]) ? null :
            <List
              style={{maxHeight:"300px",overflowY:"scroll"}}
              children={this.getObservationList()}
            />
        }
      </div>
    )
  }
}

export default class DataspaceControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewData: "Pathway"
    };
    this.changeViewData = viewData => this.setState({viewData});
  }
  render(){
    const showDataspace = this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet");
    const [pStyle,oStyle] = this.state.viewData=="Pathway" ?
      [{},{display:"none"}]:[{display:"none"},{}];
    return (
      <div>
        <div className="row">
          <DataspaceSelect showDataspace={showDataspace} viewData={this.state.viewData} changeViewData={this.changeViewData} />
        </div>
        {
          !showDataspace ? null :
            <Paper className="row">
              <div style={pStyle}>
                <PathwayData dataspace={this.props.dataspace}/>
              </div>
              <div style={oStyle}>
                <ObservationData dataspace={this.props.dataspace}/>
              </div>
            </Paper>
        }
      </div>
    )
  }
}
