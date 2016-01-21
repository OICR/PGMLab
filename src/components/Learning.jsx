import React from 'react'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class Learning extends React.Component {
    runLearning() {
 //       graph.inferenceToggle(pp);
        console.log("running learning");
    }
    render() {
        return (
            <div>  

                <a className="waves-effect waves-light orange btn white-text" onClick={this.runLearning}>Run Learning</a> 
            </div> )
    }
}


         //       <SelectObservationLearning></SelectObservationLearning>
