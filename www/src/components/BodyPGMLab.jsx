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
    }

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }


    componentDidMount() {
        $("#runLearningForm").submit(function(e){
                e.preventDefault(); //STOP default action
                console.log("newFormData", new FormData(this)) 
                var postData = $(this).serialize()
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
                       console.log("sucess returned: ", data) 
                        //data: return data from server
                    },
                    error: function(jqXHR, textStatus, errorThrown) 
                    {
                        console.log("failure", errorThrown)
                        //if fails      
                    }
                });
              //  e.unbind(); //unbind. to stop multiple form submit.
            })
        $("#runInferenceForm").submit(function(e){
                e.preventDefault(); //STOP default action
                console.log("newFormData", new FormData(this)) 
                var postData = $(this).serialize()
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
                        tempLink.setAttribute('download', 'pathway.pp');
                        tempLink.click()
                        //data: return data from server
                    },
                    error: function(jqXHR, textStatus, errorThrown) 
                    {
                        console.log("failure", errorThrown)
                        //if fails      
                    }
                });
              //  e.unbind(); //unbind. to stop multiple form submit.
            })
        console.log("ran componentDidMont")
    }

    handleLearningSubmit(e) {
        console.log("Sumitting Learning")
        $("#runLearningForm").submit()
    }

    handleInferenceSubmit(e) {
        console.log("Submitting Inference")
        $("#runInferenceForm").submit()
    }

    render () {
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
                           <div className="btn light-blue lighten-1">
                               <span>Upload Pairwise Interaction File</span>
                                <input type="file" name="pairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                           </div>
                        </div>  
                        <div className="file-field input-field">
                           <div className="btn light-blue lighten-1">
                               <span>Upload Observation File</span>
                                <input type="file" name="observationFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                           </div>
                        </div>
                        <div className="input-field">
                            <p>Number of States</p>
                             <p className="range-field">
                                <input type="number" name="numberOfStatesLearning" defaultValue="3" min="2" max="10" />
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
                           <div className="btn light-blue lighten-1">
                               <span>Upload Pairwise Interaction File</span>
                                <input type="file" name="pairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                           </div>
                        </div>
                        <div className="file-field input-field">
                           <div className="btn light-blue lighten-1">
                               <span>Upload Learnt Factorgraph (Optional)</span>
                                <input type="file" name="pairwiseInteractionFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                           </div>
                        </div>
                        <div className="file-field input-field">
                           <div className="btn light-blue lighten-1">
                               <span>Observation File</span>
                                <input type="file" name="observationFile" />
                           </div>
                           <div className="file-path-wrapper">
                                <input className="file-path validate"  type="text" />
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
                          <th data-field="pifile">Pairwise Interaction File</th>
                          <th data-field="obsfile">ObservationFile</th>
                      </tr>
                  </thead>
            
                  <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mon Dec 10 10:00pm</td>
                        <td>complete</td>
                        <td>Learning</td>
                        <td>Cell-cycle.pi</td>
                        <td>learning.obs</td>
                      </tr>
                    </tbody>
                </table>
               </div>
            </div>
         </main> )
    }
}
