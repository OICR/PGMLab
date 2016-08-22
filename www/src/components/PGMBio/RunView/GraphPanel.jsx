import React from "react"
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"

import GraphVis from "./../redux/GraphVis.jsx"

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
            <MenuItem key={i} value={String(i)} label={`Observation ${i+1}`} primaryText={`Observation ${i+1}`} />
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
    this.showGraph = () => this.props.dataspace.has("pathways") && this.props.dataspace.has("observationSet")

    this.changeViewPathway = (evt, idx, viewPathway) => {this.props.graphVisSelectPathway(viewPathway)}
    this.changeViewObservation = (evt, idx, viewObservation) => {this.props.graphVisSelectObservation(viewObservation)}

    this.initializeGV = this.initializeGV.bind(this)
    this.redrawGV = this.redrawGV.bind(this)
  }
  initializeGV(nextProps){
    const {dataspace, graphVis} = nextProps
    const canvasElement = document.getElementById("graphCanvas")
    const nodes = GraphVis.getNodes(dataspace, graphVis)
    const edges = GraphVis.getEdges(dataspace, graphVis)
    this.GVNetwork = GraphVis.initializeGVNetwork(canvasElement, nodes, edges)
  }
  redrawGV(nextProps){
    const {dataspace, graphVis} = nextProps
    const nodes = GraphVis.getNodes(dataspace, graphVis)
    const edges = GraphVis.getEdges(dataspace, graphVis)
    GraphVis.drawNetwork(this.GVNetwork, nodes, edges)
  }
  shouldComponentUpdate(nextProps, nextState){
    // Check if graph state can be drawn from dataspace
    const sameObservationSet = nextProps.dataspace.getIn(["observationSet", "_id"]) == this.props.dataspace.getIn(["observationSet", "_id"])
    const nextViewPathway = nextProps.graphVis.get("viewPathway")
    const nextViewObservation = nextProps.graphVis.get("viewObservation")
    const observationSelected = nextProps.dataspace.getIn(["observationSet", "selected", nextViewObservation])
    const pathwaySelected = nextProps.dataspace.getIn(["pathways", nextViewPathway])
    const graphPathwayAvailable = (nextViewPathway!=null) && pathwaySelected
    const graphObservationAvailable = (nextViewObservation!=null) && observationSelected && sameObservationSet
    const currentViewPathway = this.props.graphVis.get("viewPathway")
    const currentViewObservation = this.props.graphVis.get("viewObservation")

    if (graphPathwayAvailable && graphObservationAvailable) {
      if ((nextViewPathway!=null) && (nextViewObservation!=null)) {
        console.log("draw graph")
        if ((currentViewPathway==null) || (currentViewObservation==null)) {
          console.log("graph must be rendered first time")
          this.initializeGV(nextProps)
        }
        else {
          console.log("graph has already been rendered")
          this.redrawGV(nextProps)
        }
      }
      else {
        console.log("don't draw graph")
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
                viewPathway={this.props.graphVis.get("viewPathway")}
                changeViewPathway={this.changeViewPathway}
                viewObservation={this.props.graphVis.get("viewObservation")}
                changeViewObservation={this.changeViewObservation}
            />
        }
        <div id="graphCanvas">
          {
            !this.showGraph() ? <h6 className="center-align">{"Select pathway and observation data to begin visualizing"}</h6> : null
          }
        </div>
      </div>
    )
  }
}
