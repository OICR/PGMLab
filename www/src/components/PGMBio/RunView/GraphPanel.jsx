import React from "react"
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

import vis from "vis"

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
          }
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
    const showPathway = this.props.dataspace.has("pathways") //these will handle changing data while drawn
    const showObservation = this.props.dataspace.has("observationSet")
    return (
      <Paper className="row center-align">
        <div className="col s8">
          <SelectField
              fullWidth={true} autoWidth={true} hintText="Select a pathway"
              value={this.props.viewPathway}
              children={this.getPathwayChildren()}
              onChange={this.props.changeViewPathway}
          />
        </div>
        <div className="col s4">
          <SelectField
              fullWidth={true} autoWidth={true} hintText="Select an observation"
              value={this.props.viewObservation}
              children={this.getObservationChildren()}
              onChange={this.props.changeViewObservation}
          />
        </div>
      </Paper>
    )
  }
}

export default class GraphPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewPathway: null, //pathway ID
      viewObservation: null //observation index in
    }
    this.changeViewPathway = (evt, idx, viewPathway) => {console.log("pathway");viewPathway=String(viewPathway);this.setState({viewPathway})}
    this.changeViewObservation = (evt, idx, viewObservation) => {console.log("obs");viewObservation=String(viewObservation);this.setState({viewObservation})}
    this.showGraph = () => this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet")
  }
  componentDidMount(){
    this.graphVis =
    this.network = null
    this.datasetNodes = null
    this.datasetEdges = null
  }
  shouldComponentUpdate(nextProps, nextState){
    // Check if graph state can be drawn from dataspace
    const showGraph = nextProps.dataspace.has("pathways") && nextProps.dataspace.has("observationSet")
    const sameObservationSet = nextProps.dataspace.getIn(["observationSet", "_id"]) == this.props.dataspace.getIn(["observationSet", "_id"])
    const pathwayAvailable = nextProps.dataspace.hasIn(["pathways", nextState.viewPathway]) //state pathway selected in dataspace ?
    const observationAvailable = nextProps.dataspace.getIn(["observationSet", "selected", nextState.viewObservation]) //state observation selected in dataspace ? (need to check if same observationSet)
    if (showGraph) {
      if (pathwayAvailable && observationAvailable && sameObservationSet) {
        console.log("can draw graph")
      } else if (!pathwayAvailable && !observationAvailable) {
        console.log("can't draw")
      } else if (pathwayAvailable && !observationAvailable) {
        console.log("missing observation")
      } else if (!pathwayAvailable && observationAvailable) {
        console.log("missing pathway")
      }
    }
    return true
  }
  render(){
    return (
      <div className="card-panel" style={{minWidth:"800px", minHeight:"675px"}}>
        {
          !this.showGraph() ? null :
            <GraphController
                dataspace={this.props.dataspace}
                viewPathway={this.state.viewPathway}
                changeViewPathway={this.changeViewPathway}
                viewObservation={this.state.viewObservation}
                changeViewObservation={this.changeViewObservation}
            />
        }
        <div id="graphCanvas">
          {
            !this.showGraph() ? <span>Need more info</span> : null
          }
        </div>
      </div>
    )
  }
}
