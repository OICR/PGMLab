import React from "react"
import RaisedButton from "material-ui/RaisedButton"
import {indigo500, indigo100} from "material-ui/styles/colors"

export default class RunSubmit extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitInference = this.submitInference.bind(this)
  }
  submitInference(){
    let data = new FormData()
    console.log(this.props.dataspace.toJS())
    data.append("pathways", JSON.stringify(this.props.dataspace.get("pathways").toJS()))
    data.append("observationSet", JSON.stringify(this.props.dataspace.get("observationSet").toJS()))
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/submit/inference",
      processData: false, contentType: false,
      data,
      success: (data,status,jqXHR) => {
        console.log("inference successful", JSON.parse(data))
        this.props.onInferenceSuccess(JSON.parse(data))
      },
      error: (jqXHR,status,error) => {
        console.log("inference submittal error")
      }
    })
  }
  handleSubmit(evt){
    switch (this.props.runType) {
      case "Learning":
        console.log("learning")
        return
      case "Inference":
        console.log('inference')
        return this.submitInference()
    }
  }
  render(){
    return (
      <div className="row">
        <div className="col s12 center-align">
          <RaisedButton
              backgroundColor={indigo500} labelColor={indigo100} label={`Run ${this.props.runType}`}
              onTouchTap={this.handleSubmit}/>
        </div>
      </div>
    )
  }
}
