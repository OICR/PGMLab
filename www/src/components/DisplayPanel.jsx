// DisplayPanel: right side of window displaying graph
import React from 'react';

export class DisplayPanel extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(prevProps, prevState){
    $(".tooltipped").tooltip({delay:30});
  }
  breadcrumb(label,text){
    return (
      <a href="#!" style={{paddingLeft:"10px"}} className="breadcrumb">
        <span className="tooltipped" data-position="top" data-tooltip={label}>{text}</span>
      </a>
    );
  }
  render(){
    // console.log('DISPLAYPANEL:', this.props);
    // Breadcrumb texts
    const runType=this.props.toggle;
    const observationSet=(this.props.toggle === "Inference") ? this.props.observationSets[this.props.selectedObservationSetLearning].name : this.props.observationSets[this.props.selectedObservationSetInference].name;
    const observationID=(this.props.toggle === "Inference")? this.props.observationSets[this.props.selectedObservationSetLearning].id : this.props.observationSets[this.props.selectedObservationSetInference].id;
    const activePathwayName=this.props.activePathway.name;
    return (
      <div>
        <nav style={{"width":"100%"}} className="light-blue lighten-1">
          <div className="nav-wrapper">
              {this.breadcrumb("Run Type",runType)}
              {this.breadcrumb("Observation Set",observationSet)}
              {this.breadcrumb("Observation ID",observationID)}
              {this.breadcrumb("Active Pathway Name",activePathwayName)}
          </div>
         </nav>
         <div style={{"width":"100%"}} id="chart"></div>
       </div>
    )
  }

};
