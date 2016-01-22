import React from 'react'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'

export class Inference extends React.Component {
    runInference() {
        console.log("running inference");
    }
    render() {
        var activePathway = this.props.activePathway;
        console.log(this.props);
        return (
            <div>
                <br /> <br />
                <a id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>List of Pathways</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>G-protein beta:gamma signalling</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>Meiotic synapsis</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>Unwinding of DNA</a> 
                <br /><br /><br /><br />
                <a id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>Current Pathway</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>NGF Independant TRKA</a> 
                <br /><br /> <br />
                <a className="waves-effect waves-light orange btn white-text"style={{width: "300px"}}>List of Genes</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>ABI1</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>ABL1</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>ABL2</a> 
                <br /> <br />
                <a className="waves-effect waves-light orange btn white-text"style={{width: "300px"}}>Mutated Gene</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>ADORA2A</a> 
                <br /><br /><br /><br />
                <a className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}onClick={this.runInference}>Predict Impact</a> 
            </div> )
    }
}
