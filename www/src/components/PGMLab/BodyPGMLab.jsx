import 'rc-tabs/assets/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabs, { TabPane } from 'rc-tabs'

export class Body extends React.Component {

    constructor(props) {
        super(props) 

        this.state = ({jobs     : [], 
                       activeKey: "tab 2"})
 
        this.onTabsChange = this.onTabsChange.bind(this)
    }

    onTabsChange(activeKey) {
        console.log("ontabchange")
        this.setState({activeKey: activeKey})
    }

    componentDidMount() {
        var self = this
        $("#runForm").submit(function(e){
            e.preventDefault(); //STOP default action
            var inputs = $(this).serializeArray()
            var runType = (self.state.activeKey === "tab 2")? "inference": "learning"
            inputs =  (runType === "inference")? inputs.slice(-5): inputs.slice(0,-5)
               
            var jobData = { "status": "running",
                            "time":   new Date().toLocaleString(),
                            "inputs": inputs }
            var jobs = self.state.jobs.slice()
            var jobIndex = jobs.push(jobData)               
            var formURL = "http://localhost:9001/run"+ runType + "/submit"
            $.ajax(
            {
                url : formURL,
                type: "POST",
                data : new FormData(this),
                processData: false,
                contentType: false,
                success:function(data, textStatus, jqXHR) 
                {
                    var data = new Blob([data], {type: 'text/plain'});
                    var downloadURL = window.URL.createObjectURL(data)
                    var tempLink = document.createElement('a');
                    tempLink.href = downloadURL;
                    var filename = (runType === "inference")? 
                                   "pathway-" + (jobIndex+1)  + ".pp":
                                   "learnt-" + (jobIndex+1)  + ".fg"
                    tempLink.setAttribute('download', filename);
                    tempLink.click()
                    var currentJobs = self.state.jobs.slice()
                    jobData.status = "success"
                    currentJobs[jobIndex] = jobData
                    self.setState({jobs:jobs})
                },
                error: function(jqXHR, textStatus, errorThrown) 
                {
                    var currentJobs = self.state.jobs.slice()
                    jobData.status = "failed"
                    jobData.comments = jqXHR.responseText
                    currentJobs[jobIndex] = jobData
                    self.setState({jobs: jobs})
                }
            })
            self.setState({jobs: jobs})
        })
    }

    render () {
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        function compare(a,b) {
            return (a.time < b.time)? 1:
                   (a.time > b.time)? -1: 0
        }

        var self=this
        var jobs = this.state.jobs.sort(compare).map(function(job, i) {
                 var id = self.state.jobs.length-i
                 var inputs = job.inputs.map(function(input, i) { 
                                  return (<tr key={i} style={{padding: "5px"}}>
                                             <td style={{padding: "5px"}}>
                                                 <strong>{input.name.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").capitalizeFirstLetter()}</strong>
                                             </td>
                                             <td>{input.value}</td>
                                          </tr>) 
                              })
                 return( <tr key={i}>
                            <td>{id}</td>
                            <td>{job.time}</td>
                            <td>
                              {{
                                "running":  (<div className="preloader-wrapper small active">
                                                <div className="spinner-layer spinner-green-only">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="gap-patch">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                             </div>),
                                "success": (<i className="material-icons">done</i>),
                                "failed" : (<i className="material-icons">error</i>)
                              }[job.status]}
                            </td>
                            <td> 
                                 <table><tbody>
                                     {inputs}
                                 </tbody></table>
                            </td>
                            <td>
                               {job.comments}
                            </td>
                        </tr> )
               })


        return (<main> 
        <div className="row">
            <div className="col s6">
              <form name="runForm" id="runForm" method="POST">
                 <Tabs onChange={this.onTabsChange} activeKey={this.state.activeKey}>
                   <TabPane tab="Learning" key="tab 1">
                        <input name="runType" value="learning" type="hidden" />
                        <div className="file-field input-field">
                           <p>Pairwise Interaction File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="learningPairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="pairwiseInteractionFilename" type="text" />
                           </div>
                        </div>  
                        <div className="file-field input-field">
                           <p>Observation File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="learningObservationFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="observationFilename" type="text" />
                           </div>
                        </div>
                        <div className="input-field">
                            <p>Number of States</p>
                             <p className="range-field">
                                <input type="number" name="inferenceNumberOfStates" defaultValue="3" min="2" max="10" />
                            </p>
                        </div>
                        <div className="input-field">
                            <p>EM Max Iterations</p>
                            <p className="range-field">
                                <input type="number" name="emMaxIterations" defaultValue="4000" min="0" max="8000" />
                            </p>
                        </div>
                        <div className="input-field">
                            <p>Log likelihood Change limit</p>
                            <input type="number" name="logLikelihoodChangeLimit" step="0.00001" defaultValue="0.001" min="0" />
                        </div>
                        <button className="btn orange" type="submit">Run Learning</button>
                 </TabPane>
                 <TabPane tab="Inference" key="tab 2">
                        <input name="runType" value="inference" type="hidden" />
                         <div className="file-field input-field">
                           <p>Pairwise Interaction File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="inferencePairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="pairwiseInteractionFilename" type="text" />
                           </div>
                        </div>
                        <div className="file-field input-field">
                           <p>Observation File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="inferenceObservationFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="observationFilename" type="text" />
                           </div>
                        </div>
                        <div className="file-field input-field">
                           <p>Learnt Factorgraph (Optional)</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="learntFactorgraphFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="learntFactorgraphFilename" type="text" />
                           </div>
                        </div>
                        <div className="input-field">
                            <p>Number of States</p>
                            <p className="range-field">
                                <input type="number" name="learningNumberOfStates" defaultValue="3" min="2" max="10" />
                            </p>
                        </div>
                        <button className="btn orange" type="submit">Run Infernce</button>
                    </TabPane>
                 </Tabs>
               </form>
            </div>
            <div className="col s6">
               <table>
                  <thead>
                      <tr>
                          <th data-field="id">Job ID</th>
                          <th data-field="date">Time (UTC)</th>
                          <th data-field="status">Status</th>
                          <th data-field="inputs">Inputs</th>
                          <th data-field="comments">Comments</th>
                      </tr>
                  </thead>
            
                  <tbody>
                      {jobs}
                  </tbody>
                </table>
               </div>
            </div>
         </main> )
    }
}
