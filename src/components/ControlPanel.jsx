import React from 'react'

import {SelectObservationLearning} from './Selectobservationlearning.jsx'
export class ControlPanel extends React.Component {
    runInference() {
        console.log("running inference");
    }
    render() {
        var activePathway = this.props.activePathway.name;

        return (
            <div>
                <a id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>Select Pathway</a> 
                <br /><br /><br />
                <a id="side-nav-open" href="#" className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>Current Pathway</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>{activePathway}</a> 
                <br /><br /> <br />
                <a className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>Mutated Gene(s)</a> 
                <a id="side-nav-open" href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>ADORA2A</a> 
                <br /><br /><br />
                <a className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}>List of Genes</a> 
                <div style={{overflow: "scroll", height: "400px"}}>
                    {this.props.pairwiseInteractions.nodes.map(function(object, i) {
                        var geneName = (object.longname != null)? object.longname: object.id;
                        return  <div><a key={i} href="#" className="waves-effect waves-light white btn black-text" style={{width: "300px"}}>{geneName}</a></div>;
                    })}
                </div>
                <br /> <br />
               <a className="waves-effect waves-light orange btn white-text" style={{width: "300px"}}onClick={this.runInference}>Predict Impact</a> 
            </div> )
    }
}
//><GeneButton index=a{i} geneName={geneName} geneID={object.id}/>
