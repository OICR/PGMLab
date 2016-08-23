import React from "react"
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import {is} from "immutable"
import GraphVis from "./GraphVis.jsx"

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
  getLegend(){
    const stateColors = GraphVis.getStateColors()
    return (
      <h6 className="center-align">
        <span style={{color: stateColors.get("unobserved")}}>{"Unobserved"}</span>&nbsp;|&nbsp;
        <span style={{color: stateColors.get("1")}}>{"Down-regulated"}</span>&nbsp;|&nbsp;
        <span style={{color: stateColors.get("2")}}>{"Non-regulated"}</span>&nbsp;|&nbsp;
        <span style={{color: stateColors.get("3")}}>{"Up-regulated"}</span>
      </h6>
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
        <div className="col s12">
          {this.getLegend()}
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

    if (!is(nextProps.dataspace.get("pathways").size, 0)) {
      console.log("pathways can be drawn")
      if (nextProps.dataspace.hasIn(["pathways", nextProps.graphVis.get("viewPathway")])) {
        console.log("selected graph pathway information in dataspace")
        if (is(this.props.graphVis.get("viewPathway"), "") && !is(nextProps.graphVis.get("viewPathway"),"")) {
          console.log("initialize")
          this.initializeGV(nextProps)
        }
        else {
          console.log("redraw")
          this.redrawGV(nextProps)
        }
      }
      else {
        console.log("selected graph pathway info no in dataspace")
      }
    }
    else {
      console.log("not enough pathway information")
    }
    return true
  }
  getErrorMessage(){ //returns false if no error message should be shown
    const noPathways = this.props.dataspace.get("pathways").size==0
    const sameObservationSet = this.props.dataspace.get(["observationSet", "_id"])==this.props.graphVis.get("viewObservationSet")
    const observationSetSelected = this.props.dataspace.getIn(["observationSet","_id"])!=""
    const observationSelected = this.props.graphVis.get("viewObservation")!=""
    const pathwaySelected = this.props.graphVis.get("viewPathway")!=""
    const graphShouldBeDrawn = observationSetSelected && pathwaySelected && observationSelected
    const observationAvailable = this.props.dataspace.getIn(["observationSet","selected",this.props.graphVis.get("viewObservation")])
    const pathwayAvailable = this.props.dataspace.hasIn(["pathways",this.props.graphVis.get("viewPathway")])
    switch (true) {
      case !graphShouldBeDrawn:
        return false
      case noPathways:
        return "Populate your dataspace by clicking on the 'Select Pathways' and 'Select Observation Data' links"
      case !(observationAvailable && pathwayAvailable):
        if (!observationAvailable && !pathwayAvailable) {
          return "Both your selected observation and pathway to visualize are not available in your dataspace.\nSee links to the left"
        }
        else if (!observationAvailable) {
          return "Your selected observation to visualize is not available in your dataspace"
        } else {
          return "Your selected pathway to visualize is not available in your dataspace"
        }
    }
    return false
  }
  render(){
    return (
      <div className="card-panel" style={{minWidth:"800px", minHeight:"675px"}}>
        <GraphController
            dataspace={this.props.dataspace}
            viewPathway={this.props.graphVis.get("viewPathway")}
            changeViewPathway={this.changeViewPathway}
            viewObservation={this.props.graphVis.get("viewObservation")}
            changeViewObservation={this.changeViewObservation}
        />
        <div id="graphCanvas">
          {
            this.getErrorMessage() ?
              <h6 className="center-align">{this.getErrorMessage()}</h6>
              : null
          }
        </div>
      </div>
    )
  }
}
