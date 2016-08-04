import React from "react";
import Dialog from "material-ui/Dialog";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
var classNames=require("classnames");

class UploadButton extends React.Component {
  constructor(props){
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(evt){
    evt.preventDefault()
    const data = new FormData(this.refs[this.props.uploadType])
    data.append("filename", $(`input[name=${this.props.uploadType}]`)[0].files[0].name)
    data.append("id_token", this.props.auth.get("googleIdToken"))
    $.ajax({
      type: "POST",
      // url: `https://localhost:8000/upload/${this.props.uploadType}`,
      url: `http://localhost:8000/upload/${this.props.uploadType}`,
      processData: false,
      contentType: false,
      data,
      success: (uploadPayload, textStatus, jqXHR) => {
        //On upload success, should return upload info and json format of file
        console.log("upload success")
        $(`input[name=${this.props.uploadType}]`).val(null);
        this.props.onUpload(JSON.parse(uploadPayload));
      },
      error: (jqXHR, textStatus, error) => {
        console.log("upload error", error);
        //If fails, should empty out file property of input so user can add again
        $(`input[name=${this.props.uploadType}]`).val(null);
      }
    })
  }

  render(){
    const inputStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    };
    return (
      <div className="col s3">
        <RaisedButton label={this.props.uploadType} labelPosition="before">
          <form enctype="multipart/form-data" ref={this.props.uploadType}>
            <input type="file" name={this.props.uploadType} onChange={evt=> {this.handleUpload(evt)}} style={inputStyle}/>
          </form>
        </RaisedButton>
      </div>
    );
  }
}

class UploadTable extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
  }
  render(){
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
}

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
    return (
      <TableRow>
        <TableHeaderColumn colSpan="6" className="row">
          {
            ["pathway", "observation", "parameters", "probabilities"]
              .map(uploadType => <UploadButton key={uploadType} uploadType={uploadType} onUpload={this.props.onUpload} auth={this.props.auth} />)
          }
        </TableHeaderColumn>
      </TableRow>
    );
  }
  getTableHeadings(){
    return (
      <TableRow>
        {
          ["ID", "Datetime", "Type", "Status", "Name", "Comments"]
            .map(heading => <TableHeaderColumn key={heading}>{heading}</TableHeaderColumn>)
        }
      </TableRow>
    );
  }
  render(){
    return (
      <div>
        {this.getOpenBtn()}
        <Dialog open={this.state.open} onRequestClose={()=>{this.setState({open:false})}}
          title={"Upload Files"} titleStyle={{paddingBottom:"0px"}} titleClassName={"center-align"}>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              {this.getUploadBtns()}
              {this.getTableHeadings()}
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false}>
              <UploadTable uploads={this.props.uploads} />
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}
