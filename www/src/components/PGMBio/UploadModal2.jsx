import React from "react";
import Dialog from "material-ui/Dialog";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
var classNames = require("classnames");
var moment = require("moment");

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
  getTableHeader(){
    const uploadBtns = ["pathway", "observation", "parameters", "probabilities"]
      .map(uploadType =>
        <UploadButton key={uploadType}
          uploadType={uploadType} onUploadSuccess={this.props.onUploadSuccess}
          auth={this.props.auth} />);
    const headings = ["ID", "Datetime", "Type", "Status", "Name", "Comments"]
      .map(heading => <TableHeaderColumn key={heading}>{heading}</TableHeaderColumn>);
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn colSpan="6" className="row">
            {uploadBtns}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          {headings}
        </TableRow>
      </TableHeader>
    );
  }
  getTableRows(){
    return (
      this.props.uploads.valueSeq()
        .map(upload => <UploadRow key={upload.get("_id")} upload={upload}/>)
        // .map(upload => <UploadRow key={upload.getIn(["_id","$oid"])} upload={upload}/>)
    );
    // return (null
    //   Object.keys(this.props.uploads.toJS())
    //     .map(k => this.props.uploads.t)
    //     .map(upload => <UploadRow key={upload._id.$oid} upload={upload}/>)
    // );
  }
  render(){
    return (
      <div>
        {this.getOpenBtn()}
        <Dialog open={this.state.open} onRequestClose={()=>{this.setState({open:false})}}
          title={"Upload Files"} titleStyle={{paddingBottom:"0px"}} titleClassName={"center-align"}>
          <Table selectable={false} height={"250px"}>
            {this.getTableHeader()}
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false}
              children={this.getTableRows()} />
          </Table>
        </Dialog>
      </div>
    );
  }
}

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
        const payload = JSON.parse(uploadPayload);
        if (payload.meta.success) {
            this.props.onUploadSuccess(payload);
        } else {
          console.log("upload success, server error: ", payload.json.comments)
        }
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

class UploadRow extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    // const {_id, datetime, type, success, filename, comments} = this.props.upload;
    console.log(this.props.upload.toJS());
    const upload = this.props.upload;
    return (
      <TableRow>
        <TableRowColumn>{`${upload.get("_id")}`}</TableRowColumn>
        <TableRowColumn>{`${moment(upload.get("datetime")).format("MM Do YYYY, \n h:mm a")}`}</TableRowColumn>
        <TableRowColumn>{`${upload.get("type")}`}</TableRowColumn>
        <TableRowColumn>{`${upload.get("success")}`}</TableRowColumn>
        <TableRowColumn>{`${upload.get("filename")}`}</TableRowColumn>
        <TableRowColumn>{`${upload.get("comments")}`}</TableRowColumn>
      </TableRow>
    )
    // return (
    //     <TableRow>
    //       <TableRowColumn>{`${_id.$oid}`}</TableRowColumn>
    //       <TableRowColumn>{`${moment(datetime).format("MMMM Do YYYY, h:mm a")}`}</TableRowColumn>
    //       <TableRowColumn>{`${type}`}</TableRowColumn>
    //     <TableRowColumn>{`${success}`}</TableRowColumn>
    //       <TableRowColumn>{`${filename}`}</TableRowColumn>
    //       <TableRowColumn>{`${comments}`}</TableRowColumn>
    //     </TableRow>
    // );
  }
}
