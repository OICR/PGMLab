import React from "react"
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"

export default class HeatmapController extends React.Component {
  render(){
    return (
      <div className="card-panel">
        <Paper className="row center-align">
          <div className="col s6">
            <SelectField fullWidth={true} autoWidth={true} hintText="Select a pathway"
              value={1} children={[]} onChange={evt => {}}
            />
          </div>
          <div className="col s6">
            <SelectField fullWidth={true} autoWidth={true} hintText="Select a state"
              value={1} children={[]} onChange={evt => {}}
            />
          </div>
        </Paper>
      </div>
    )
  }
}
