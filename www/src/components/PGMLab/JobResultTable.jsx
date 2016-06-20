import React from "react"

export class JobResultTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: []
    }
  }

  render(){
    // String.prototype.capitalizeFirstLetter = function() {
    //     return this.charAt(0).toUpperCase() + this.slice(1);
    // }
    //
    // function compare(a,b) {
    //     return (a.time < b.time)? 1:
    //            (a.time > b.time)? -1: 0
    // }
    //
    // var self=this
    // var jobs = this.state.jobs.sort(compare).map(function(job, i) {
    //          var id = self.state.jobs.length-i
    //          var inputs = job.inputs.map(function(input, i) {
    //                           return (<tr key={i} style={{padding: "5px"}}>
    //                                      <td style={{padding: "5px"}}>
    //                                          <strong>{input.name.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").capitalizeFirstLetter()}</strong>
    //                                      </td>
    //                                      <td>{input.value}</td>
    //                                   </tr>)
    //                       })
    //          return( <tr key={i}>
    //                     <td>{id}</td>
    //                     <td>{job.time}</td>
    //                     <td>
    //                       {{"running":  (<div className="preloader-wrapper small active">
    //                                         <div className="spinner-layer spinner-green-only">
    //                                             <div className="circle-clipper left">
    //                                                 <div className="circle"></div>
    //                                             </div>
    //                                             <div className="gap-patch">
    //                                                 <div className="circle"></div>
    //                                             </div>
    //                                             <div className="circle-clipper right">
    //                                                 <div className="circle"></div>
    //                                             </div>
    //                                         </div>
    //                                      </div>),
    //                         "success": (<i className="material-icons">done</i>),
    //                         "failed" : (<i className="material-icons">error</i>)
    //                       }[job.status]}
    //                     </td>
    //                     <td>
    //                          <table><tbody>
    //                              {inputs}
    //                          </tbody></table>
    //                     </td>
    //                     <td>
    //                        {job.comments}
    //                     </td>
    //                 </tr> )
    //        })
    return (
      <div>
        TABLE
      </div>
    );
    // return (
    //   <div className="col s6">
    //      <table>
    //         <thead>
    //             <tr>
    //                 <th data-field="id">Job ID</th>
    //                 <th data-field="date">Time (UTC)</th>
    //                 <th data-field="status">Status</th>
    //                 <th data-field="inputs">Inputs</th>
    //                 <th data-field="comments">Comments</th>
    //             </tr>
    //         </thead>
    //         <tbody>{jobs}</tbody>
    //       </table>
    //   </div>
    // );
  }
}
