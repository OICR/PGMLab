import React from 'react'

var Dropzone = require('react-dropzone')

export class UploadModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          files: []
        }
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    readPathwayFile(e) {
        var reader = new FileReader()
        var file = e.target.files[0]

        function isInteger(str) {
           return /^([1-9]\d*)$/.test(str)
        }

        var self = this
        reader.onload = function(upload) {
            var contents = upload.target.result
            var lines = contents.split("\n")||[]
            lines.pop() // There is one additional empty element on the end because of newlines on the end of the last line
            var numberOfLines = lines.length
            

            if (numberOfLines < 2) {
                alert("File does not follow the correct format")
            }
            else {
                var numberOfInteractions = lines.length - 2
                if (!isInteger(lines[0])) {
                    console.log("first line", lines[0])
                    alert("ERROR: First line needs to be an integer representing the number of interactions")
                }
                else if (Number(lines[0]) !== numberOfInteractions ) {
                    console.log("header:", lines[0], "Number of interactions in file: ", numberOfInteractions)
                    alert("ERROR: number of interactions does not match number at top of file")
                } 
                else if (lines[1] !== "") {
                    console.log("second line", lines[1])
                    alert("ERROR: Second line needs to be empty")
                }
                else {
                    var nodes = {},
                        nodesList = [],
                        links = [],
                        nodeCount = 0
                    for (let i=2; i < numberOfLines; i++) {
                        var lineParts = lines[i].split("\t")
                        if (lineParts.length < 2) {
                            console.log("Incorrect interaction line", lines[i])
                            alert("ERROR: all lines must have format <nodeFrom>\\t<NodeToo> ; will use first two columns. Trouble line:", lines[i])
                            return
                        } 
                        else {
                            if (!nodes.hasOwnProperty(lineParts[0])) {
                                nodes[lineParts[0]] = ++nodeCount
                                nodesList.push({"name":     lineParts[0],
                                                "label":    lineParts[0],
                                                "longname": lineParts[0],
                                                "name":     lineParts[0], 
                                                "leaf":     null,
                                                "shape":    null,
                                                "shape3":   null,
                                                "type":     null })                              
                            }
                            if(!nodes.hasOwnProperty(lineParts[1])) {
                                nodes[lineParts[1]] = ++nodeCount
                                nodesList.push({"name":     lineParts[1],
                                                "label":    lineParts[1],
                                                "longname": lineParts[1],
                                                "name":     lineParts[1],
                                                "leaf":     null,
                                                "shape":    null,
                                                "shape3":   null,
                                                "type":     null })
                           }

                            links.push({ "source": lineParts[0],
                                         "target": lineParts[1],
                                         "logic":  0,
                                         "value":  1})  
                        }
                    }

                    var pairwiseInteractions = { "nodes": nodesList, 
                                                 "links": links}
                    self.props.addNewPathway(file.name, pairwiseInteractions)
                }
            }
        }
       
        reader.readAsText(file)
    }

    render() {
        return (
                <div id="uploadModal1" className="modal">
                    <div className="modal-content">
                        <h4>Upload / Download Files</h4>
                        <h5>upload pathway</h5>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Add Pathway File</span>
                                    <input type="file" onChange={this.readPathwayFile.bind(this)}/>
                                </div>
                                <div className="file-path-wrapper" >
                                    <input className="file-path validate" type="text" placeholder="Upload pathways"/>
                                </div>
                            </div>
                        </form>
                        <form action="#">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Observation(s)</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload observations" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>)
    }
}
