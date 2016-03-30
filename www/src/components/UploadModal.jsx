import React from 'react'

export class UploadModal extends React.Component {

    render() {
        return (
                <div id="uploadModal1" className="modal">
                    <div className="modal-content">
                        <h4>Upload / Download Files</h4>
                        <form action="#">
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Pathway(s)</span>
                                    <input type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload pathways" />
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
