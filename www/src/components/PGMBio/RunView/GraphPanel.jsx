import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

//put these into a module
const getName = p => p.has("name") ? p.get("name") : p.get("filename")
const getID = p => p.has("id") ? p.get("id") : p.get("_id")
const getLabel = p => getName(p).length > 35 ? getName(p).substr(0,35).concat("...") : getName(p)
class GraphController extends React.Component {
  constructor(props){
    super(props);
    this.getPathwayChildren = this.getPathwayChildren.bind(this)
    this.getObservationChildren = this.getObservationChildren.bind(this);
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
  render(){
    const showPathway = this.props.dataspace.has("pathways")
    const showObservation = this.props.dataspace.has("observationSet")
    return (
      <div className="row center-align">
        <div className="col s8">
          {
            !this.props.dataspace.has("pathways") ? null :
              <SelectField
                  fullWidth={true} autoWidth={true} hintText="Select a pathway"
                  children={this.getPathwayChildren()}
                  onChange={this.props.changeViewPathway}
              />
          }
        </div>
        <div className="col s4">
          {
            !this.props.dataspace.has("observationSet") ? null :
              <SelectField
                  fullWidth={true} autoWidth={true} hintText="Select an observation"
                  children={this.getObservationChildren()}
                  onChange={this.props.changeViewObservation}
              />
          }
        </div>
      </div>
    )
  }
}

export default class GraphPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewPathway: null,
      viewObservation: null
    }
    this.changeViewPathway = (evt, idx, viewPathway) => {this.setState({viewPathway})}
    this.changeViewObservation = (evt, idx, viewObservation) => {this.setState({viewObservation})}
  }
  render(){
    const showGraph = this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet")
    return (
      <div className="card-panel" style={{minWidth:"800px", minHeight:"675px"}}>
        <GraphController
            dataspace={this.props.dataspace}
            viewPathway={this.state.viewPathway}
            changeViewPathway={this.changeViewPathway}
            viewObservation={this.state.viewObservation}
            changeViewObservation={this.changeViewObservation}
        />
        <div>{this.state.viewPathway}{this.state.viewObservation}</div>
      </div>
    )
  }
}
