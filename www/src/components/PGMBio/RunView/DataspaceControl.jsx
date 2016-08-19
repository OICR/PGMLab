import React from "react";
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
        {"View data by: "}
        {
          <a href="#" style={pStyle}
              onClick={evt => this.props.changeViewData("Pathway")}>
            {"Pathways"}
          </a>
        }
        {" / "}
        {
          <a href="#" style={oStyle}
              onClick={evt => this.props.changeViewData("Observation")}>
            {"Observations"}
          </a>
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
      viewPathway: Map(),
    }
    this.changeViewPathway = (evt, idx, viewPathway) => this.setState({viewPathway})
  }
  render(){
    return (
      <div className="col s12">
        <SelectField
            fullWidth={true}
            autoWidth={true}
            hintText="Select a pathway"
            value={this.state.viewPathway}
            onChange={this.changeViewPathway}
            children={
              this.props.dataspace.get("pathways").valueSeq()
              .sort((a,b) => {
                const [aName, bName] = [a,b].map(p => getName(p).toLowerCase());
                switch (true) {
                  case aName < bName: return -1
                  case aName > bName: return 1
                  default: return 0
                };
              })
              .map(p => <MenuItem key={getID(p)} value={p} primaryText={getName(p)} autoWidth={false} label={getLabel(p)}/>)
            }
        />
        <List
            style={{maxHeight:"300px",overflowY:"scroll"}}
            children={
              !this.props.dataspace.hasIn(["pathways", getID(this.state.viewPathway)]) ? null :
                this.props.dataspace.getIn(["pathways", getID(this.state.viewPathway), "data", "nodes"])
                  .valueSeq()
                  .map(n =>
                    <ListItem key={n.get("name")}
                        primaryText={n.get("longname", "No longname available")}
                        secondaryText={n.get("name")}
                    />)
            }
        />
      </div>
    )
  }
}

class ObservationData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewObservation: Map()
    }
    this.changeViewObservation = (evt, idx, viewObservation) => this.setState({viewObservation});
  }
  render(){
    return (
      <div className="col s12">
        <SelectField
            fullWidth={true}
            hintText="Select an observation"
        >
        </SelectField>
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
    const [pStyle,oStyle] = this.state.viewData=="Pathway" ?
      [{},{display:"none"}]:[{display:"none"},{}];
    return (
      <div>
        {
          !(this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet")) ? null :
          <div className="row">
            <DataspaceSelect viewData={this.state.viewData} changeViewData={this.changeViewData} />
            <div style={pStyle}>
              <PathwayData dataspace={this.props.dataspace}/>
            </div>
            <div style={oStyle}>
              <ObservationData dataspace={this.props.dataspace}/>
            </div>
          </div>
        }
      </div>
    )
  }
}
