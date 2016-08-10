import React from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
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
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false} stripedRows={true}
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
    this.state = {
      "errorMessage": ""
    };
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
            this.setState({"errorMessage": "Upload Successful"});
        } else {
          console.log("upload success, server error: ", payload);
          this.setState({"errorMessage": "Server Error, try again"});
        }
      },
      error: (jqXHR, textStatus, error) => {
        console.log("upload error", error);
        //If fails, should empty out file property of input so user can add again
        $(`input[name=${this.props.uploadType}]`).val(null);
        this.setState({"errorMessage": "Browser Error, try again"});
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
        <Snackbar open={false} message={this.state.errorMessage}/>
      </div>
    );
  }
}

class UploadRow extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $(".tooltipped").tooltip({"delay": 50});
  }
  render(){
    // const {_id, datetime, type, success, filename, comments} = this.props.upload;
    console.log(this.props.upload.toJS());
    const upload = this.props.upload;
    const id = upload.get("_id");
    const datetime = moment(upload.get("datetime")).format("MM/DD/YY");
    const type = upload.get("type");
    const success = upload.get("success");
    const filename = upload.get("filename");
    const comments = upload.get("comments");
    return (
      <TableRow>
        <TableRowColumn className="tooltipped" data-tooltip={id}>
            {`${id}`}
        </TableRowColumn>
        <TableRowColumn>{`${datetime}`}</TableRowColumn>
        <TableRowColumn>{`${type}`}</TableRowColumn>
        <TableRowColumn>{`${success}`}</TableRowColumn>
        <TableRowColumn className="tooltipped" data-tooltip={filename}>
          {`${filename}`}
        </TableRowColumn>
        <TableRowColumn className="tooltipped" data-tooltip={comments}>
          {`${comments}`}
        </TableRowColumn>
      </TableRow>
    );
  }
}
