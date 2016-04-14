import React from 'react'

var ReactDOM = require('react-dom')
var ReactTabs = require('react-tabs')
var Tab = ReactTabs.Tab
var Tabs = ReactTabs.Tabs
var TabList = ReactTabs.TabList
var TabPanel = ReactTabs.TabPanel


export class Body extends React.Component {

    constructor(props) {
        super(props) 
        this.state = ({jobs: []})
 
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect() {
        //this.forceUpdate()
    }
 
    componentDidUpdate() {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
        var self = this
        $("#runLearningForm").submit(function(e){
                e.preventDefault(); //STOP default action
                var jobData = { "type":   "Learning",
                                "status": "running",
                                "time":   new Date().toLocaleString(),
                                "inputs": $(this).serializeArray() }
                var jobs = self.state.jobs.slice()
                var jobIndex = jobs.push(jobData)
                
                console.log("newFormData", new FormData(this)) 
                console.log("postData", postData) //, $(this).children("div.input-field.first").input() )
                var formURL = $(this).attr("action")
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
                        tempLink.setAttribute('download', "learnt-" + (jobIndex+1)  + ".fg");
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
                        currentJobs[jobIndex] = jobData
                        alert(testStatus)
                        self.setState({jobs:jobs})
                    }
                })
                self.setState({jobs: jobs})
            })
        $("#runInferenceForm").submit(function(e){
                e.preventDefault(); //STOP default action
                var jobData = { "type":   "Inference",
                                "status": "running",
                                "time":   new Date().toLocaleString(),
                                "inputs": $(this).serializeArray() }
                var jobs = self.state.jobs.slice()
                var jobIndex = jobs.push(jobData)
 
                var formURL = $(this).attr("action")
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
                        tempLink.setAttribute('download', "pathway-" + (jobIndex+1)  + ".pp");
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
                       console.log(jqXHR.responseText)
                        jobData.comments = jqXHR.responseText
                        currentJobs[jobIndex] = jobData
                        self.setState({jobs:jobs})
                    }
                })
                self.setState({jobs: jobs})
            })
    }

    componentDidMount() {
        var self = this
        $("#runLearningForm").submit(function(e){
                e.preventDefault(); //STOP default action
                var jobData = { "type":   "Learning",
                                "status": "running",
                                "time":   new Date().toLocaleString(),
                                "inputs": $(this).serializeArray() }
                var jobs = self.state.jobs.slice()
                var jobIndex = jobs.push(jobData)
                
                var formURL = $(this).attr("action")
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
                        tempLink.setAttribute('download', "learnt-" + (jobIndex+1)  + ".fg");
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
                        currentJobs[jobIndex] = jobData
                        alert(testStatus)
                        self.setState({jobs:jobs})
                    }
                })
                self.setState({jobs: jobs})
            })
        $("#runInferenceForm").submit(function(e){
                e.preventDefault(); //STOP default action
                var jobData = { "type":   "Inference",
                                "status": "running",
                                "time":   new Date().toLocaleString(),
                                "inputs": $(this).serializeArray() }
                var jobs = self.state.jobs.slice()
                var jobIndex = jobs.push(jobData)
                
                var formURL = $(this).attr("action")
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
                        tempLink.setAttribute('download', "pathway-" + (jobIndex+1)  + ".pp");
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
                       console.log(jqXHR.responseText)
                        jobData.comments = jqXHR.responseText
                        currentJobs[jobIndex] = jobData
                        self.setState({jobs:jobs})
                    }
                })
                self.setState({jobs: jobs})
            })
    }

    render () {
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        var self=this
        var jobs = this.state.jobs.reverse().map(function(job, i) {
                 var id = self.state.jobs.length-i
                 var inputs = job.inputs.map(function(input, i) { 
                                  return (<li key={i}><strong>{input.name.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").capitalizeFirstLetter()}:</strong>   {input.value}</li>) 
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
                            <td>{job.type}</td>
                            <td> 
                                 <ul>
                                     {inputs}
                                 </ul>
                            </td>
                            <td>{job.comments}</td>
                        </tr> )
               })


        return (<main> 
        <div className="row">
            <div className="col s6">
                <Tabs onSelect={this.handleSelect} selectedIndex={1}>
                 <TabList>
                    <Tab>Learning</Tab>
                    <Tab>Inference</Tab>
                 </TabList>
                 <TabPanel>
                     <form name="runLearningForm" id="runLearningForm" action="http://localhost:9001/runlearning/submit" method="POST">
                        <div className="file-field input-field">
                           <p>Pairwise Interaction File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="PairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="pairwiseInteractionFilename" type="text" />
                           </div>
                        </div>  
                        <div className="file-field input-field">
                           <p>Observation File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="observationFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="observationFilename" type="text" />
                           </div>
                        </div>
                        <div className="input-field">
                            <p>Number of States</p>
                             <p className="range-field">
                                <input type="number" name="numberOfStates" defaultValue="3" min="2" max="10" />
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
                     </form>
                 </TabPanel>
                 <TabPanel>
                    <form name="runInferenceForm" id="runInferenceForm" action="http://localhost:9001/runinference/submit" method="POST">
                         <div className="file-field input-field">
                           <p>Pairwise Interaction File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="pairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" name="pairwiseInteractionFilename" type="text" />
                           </div>
                        </div>
                        <div className="file-field input-field">
                           <p>Observation File</p>
                           <div className="btn light-blue lighten-1">
                               <span>Upload</span>
                                <input type="file" name="observationFile" />
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
                                <input type="number" name="numberOfStates" defaultValue="3" min="2" max="10" />
                            </p>
                        </div>
                        <button className="btn orange" type="submit">Run Infernce</button>
                    </form>
                 </TabPanel>
               </Tabs>
            </div>
            <div className="col s6">
               <table>
                  <thead>
                      <tr>
                          <th data-field="id">Job ID</th>
                          <th data-field="date">Time (UTC)</th>
                          <th data-field="status">Status</th>
                          <th data-field="type">Type</th>
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
