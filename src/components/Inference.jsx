import React from 'react'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class Inference extends React.Component {
    runInference() {
 //       graph.inferenceToggle(pp);
        console.log("running inference");
    }
    render() {
        return (
            <div>  
                <a className="waves-effect waves-light orange btn white-text" onClick={this.runInference}>Run Inference</a> 
            </div> )
    }
}
