import React from "react";
import Dialog from "material-ui/Dialog";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
var classNames=require("classnames");


export class UploadModal2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  getOpenBtn(){
    return (
      <a href="#!" onClick={()=>{this.setState({open:true})}}>
        <span>{"Upload Data"}</span>
      </a>
    );
  }
  getUploadBtns(){
    const inputStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    }
    const btn = (label,onChange) => (
      <div className="col s3">
        <FlatButton label={label} labelPosition="before">
          <form enctype="multipart/form-data">
            <input type="file" onChange={onChange} style={inputStyle}/>
          </form>
        </FlatButton>
      </div>
    );
    return (
      <TableRow>
        <TableHeaderColumn colSpan="6" className="row">
          {btn("Pathway", (evt)=>{this.props.uploadFile(evt,"PATHWAY")})}
          {btn("Observation", (evt)=>{this.props.uploadFile(evt,"OBSERVATION")})}
          {btn("Parameters", (evt)=>{this.props.uploadFile(evt,"PARAMETERS")})}
          {btn("Probabilities", (evt)=>{this.props.uploadFile(evt,"PROBABILITIES")})}
        </TableHeaderColumn>
      </TableRow>
    );
  }
  getTableHeadings(){
    return (
      <TableRow>
        <TableHeaderColumn>{"ID"}</TableHeaderColumn>
        <TableHeaderColumn>{"Datetime"}</TableHeaderColumn>
        <TableHeaderColumn>{"Type"}</TableHeaderColumn>
        <TableHeaderColumn>{"Status"}</TableHeaderColumn>
        <TableHeaderColumn>{"Name"}</TableHeaderColumn>
        <TableHeaderColumn>{"Comments"}</TableHeaderColumn>
      </TableRow>
    );
  }
  getTableRows(){
    return (
      <TableRow>
          <TableRowColumn>a</TableRowColumn>
          <TableRowColumn>a</TableRowColumn>
          <TableRowColumn>a</TableRowColumn>
          <TableRowColumn>a</TableRowColumn>
          <TableRowColumn>a</TableRowColumn>
          <TableRowColumn>a</TableRowColumn>
      </TableRow>
    );
  }
  render(){
    return (
      <div>
        {this.getOpenBtn()}
        <Dialog modal={true} open={this.state.open}
          title={"Upload Files"} titleStyle={{paddingBottom:"0px"}} titleClassName={"center-align"}>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              {this.getUploadBtns()}
              {this.getTableHeadings()}
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false}>
              {this.getTableRows()}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}
