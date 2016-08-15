import React from "react";
import {Dialog, FlatButton} from "material-ui";

export default class PathwaySelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }
  render(){
    const openBtn = (
      <a href="#" onClick={evt => this.setState({open:true})}>{"Select Pathways"}</a>
    );
    const closeBtn = (
      <FlatButton label="Close" onTouchTap={evt => this.setState({open:false})}/>
    );
    return (
      <div>
        {openBtn}
        <Dialog modal={true} open={this.state.open} actions={[closeBtn]}>
            <div className="row">
              awdawd
            </div>
        </Dialog>
      </div>
    );
  }
}
