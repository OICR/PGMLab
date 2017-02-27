import React from "react"
import InChlib from "biojs-vis-inchlib"

import Paper from "material-ui/Paper"

const HEATMAP_MAXHEIGHT = 900
const HEATMAP_WIDTH = 1200
export default class HeatmapPanel extends React.Component {
  componentDidMount(){
    this.inchlib = new InChlib({
      target: "heatmapCanvas",
      metadata: false,
      column_metadata: false,
      draw_row_ids: true,
      dendrogram: false,
      heatmap_colors: "Greys",
      heatmap_part_width: 0.9,
      max_height: HEATMAP_MAXHEIGHT,
      navigation_toggle: {
        color_scale: false,
        distance_scale: false,
        export_button: true,
        filter_button: true,
        hint_button: false
      },
      width: HEATMAP_WIDTH
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    const nextViewResult = nextProps.heatmap.get("viewResult")
    const nextViewPathway = nextProps.heatmap.get("viewPathway")
    const nextViewState = nextProps.heatmap.get("viewState")
    const viewPathway = this.props.heatmap.get("viewPathway")
    const viewState = this.props.heatmap.get("viewState")
    if (!(nextViewResult==""||nextViewPathway==""||nextViewState=="")) {
      console.log("heatmap should be drawn")
      // Set color scheme
      if (viewState!=nextViewState) {
        this.inchlib.update_settings({
          "heatmap_colors": ({"1":"Reds","2":"Blues","3":"Greens"})[nextViewState]
        })
      }
      // Update heatmap by checking option diff
      if (viewPathway!=nextViewPathway||viewState!=nextViewState) {
        this.inchlib.read_data(
          nextProps.heatmap
            .getIn(["data","inchlib",nextViewPathway,nextViewState])
            .toJS()
        )
        if (viewPathway==""||viewState=="") {
          this.inchlib.draw()
        } else {
          this.inchlib.redraw()
        }
      }
      return true
    } else {
      return false
    }
  }
  render(){
    return (
      <Paper className="row center-align" style={{height:`${HEATMAP_MAXHEIGHT}px`}}>
        <div id="heatmapCanvas"></div>
      </Paper>
    )
  }
}
