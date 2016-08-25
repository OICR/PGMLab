import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
var moment = require("moment");

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
        console.log("upload browser success");
        $(`input[name=${this.props.uploadType}]`).val(null);
        const payload = JSON.parse(uploadPayload);
        if (payload.meta.success) {
            // Reduce into store
            this.props.onUploadSuccess(payload);
            console.log("upload parse success", payload)
        } else {
          this.props.onUploadSuccess(payload);
          console.log("upload server error", payload);
        };
      },
      error: (jqXHR, textStatus, error) => {
        //If fails, should empty out file property of input so user can add file again
        $(`input[name=${this.props.uploadType}]`).val(null);
        console.log("upload browser error", error);
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
  componentDidMount(){
    $(".tooltipped").tooltip({"delay": 30});
  }
  render(){
    const upload = this.props.upload;
    const id = upload.get("_id");
    const datetime = moment(upload.get("datetime")).format("MM/DD/YY");
    const type = upload.get("type");
    const success = upload.get("success");
    const filename = upload.get("filename");
    const comments = upload.get("comments");
    return (
      <TableRow striped={!success}>
        <TableRowColumn className="tooltipped" data-tooltip={id}>
            {`${id}`}
        </TableRowColumn>
        <TableRowColumn>{`${datetime}`}</TableRowColumn>
        <TableRowColumn>{`${type}`}</TableRowColumn>
        <TableRowColumn>{`${success}`}</TableRowColumn>
        <TableRowColumn className="tooltipped" data-tooltip={filename}>
          {`${filename}`}
        </TableRowColumn>
        <TableRowColumn className="tooltipped" data-tooltip={comments ? comments : "No upload comments"}>
          {`${comments}`}
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default class UploadModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }
  getTableHeader(){
    const uploadBtns = ["pathway", "observation", "parameters", "probabilities"]
      .map(uploadType =>
        <UploadButton key={uploadType}
          uploadType={uploadType} onUploadSuccess={this.props.onUploadSuccess}
          auth={this.props.auth} />);
    const headings = ["ID", "Date", "Type", "Status", "Name", "Comments"]
      .map(heading => <TableHeaderColumn key={heading}>{heading}</TableHeaderColumn>);
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn colSpan="6" className="row">{uploadBtns}</TableHeaderColumn>
        </TableRow>
        <TableRow>
          {headings}
        </TableRow>
      </TableHeader>
    )
  }
  getTableRows(){
    return (
      this.props.uploads.valueSeq()
        .sort((u1, u2) => moment(u1.get("datetime")).isAfter(u2.get("datetime")) ? -1 : 1)
        .map(upload => <UploadRow key={upload.get("_id")} upload={upload}/>)
    )
  }
  render(){
    const openBtn = (
      <a href="#" onClick={()=>{this.props.toggleUploadModal(true)}}>{"Upload Data"}</a>
    )
    const closeBtn = (
      <FlatButton label="Close" onTouchTap={()=>{this.props.toggleUploadModal(false)}}/>
    )
    return (
      <div>
        {openBtn}
        <Dialog modal={true} open={this.props.uploadModalOpen} actions={[closeBtn]}
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
