import React from "react"

export class LearningSubmit extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //defaultValues
      numberStates: 3,
      maxIterations: 4000
    }

    this.submitLearning = this.submitLearning.bind(this);
  }

  componentDidMount(){
    var self = this
    $("#runForm").submit(function(e){
        e.preventDefault(); //STOP default action
        console.log("THIS", this);
        var inputs = $(this).serializeArray()
        var runType = (self.state.activeKey === "tab 2")? "inference": "learning"
        inputs =  (runType === "inference")? inputs.slice(-5): inputs.slice(0,-5)

        var jobData = { "status": "running",
                        "time":   new Date().toLocaleString(),
                        "inputs": inputs }
        var jobs = self.state.jobs.slice()
        var jobIndex = jobs.push(jobData)
        var formURL = "http://localhost:9002/run/"+ runType + "/submit"
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data : new FormData(this),
            processData: false,
            contentType: false,
            success:function(data, textStatus, jqXHR)
            {
                console.log("ajax.success:", data,textStatus,jqXHR);
                // var data = new Blob([data], {type: 'text/plain'});
                // var downloadURL = window.URL.createObjectURL(data)
                // var tempLink = document.createElement('a');
                // tempLink.href = downloadURL;
                // var filename = (runType === "inference")?
                //                "pathway-" + (jobIndex+1)  + ".pp":
                //                "learnt-" + (jobIndex+1)  + ".fg"
                // tempLink.setAttribute('download', filename);
                // tempLink.click()
                // var currentJobs = self.state.jobs.slice()
                // jobData.status = "success"
                // currentJobs[jobIndex] = jobData
                // self.setState({jobs:jobs})
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log("ajax.error:", jqXHR, textStatus, errorThrown)
                // var currentJobs = self.state.jobs.slice()
                // jobData.status = "failed"
                // jobData.comments = jqXHR.responseText
                // currentJobs[jobIndex] = jobData
                // self.setState({jobs: jobs})
            }
        })
        self.setState({jobs: jobs})
    })
  }

  submitLearning(evt){
    console.log("learning", evt);
    evt.preventDefault()
    console.log(this.refs.learningForm)
    $.ajax({
      type: "POST",
      url: "http://localhost:9002/run/learning/submit",
      processData: false,
      contentType: false,
      data: new FormData(this.refs.learningForm),
      success: (data, textStatus, jqXHR) => {
        console.log("ajax.success:", data, textStatus, jqXHR);
      },
      error: (jqXHR, textStatus, error) => {
        console.log("ajax.error:", jqXHR, textStatus, error);
      }
    });
  }
  render(){
    return (
      <form ref="learningForm" onSubmit={evt=>{this.submitLearning(evt)}}>
          <div className="row input-field file-field">
            <p>{"Pairwise interaction File"}</p>
            <div className="btn">
              <span>{"Upload"}</span>
              <input type="file" name="learningPairwiseInteractionFile" />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path validate" name="pairwiseInteractionFilename" />
            </div>
          </div>

          <div className="row input-field file-field">
            <p>{"Observation File"}</p>
            <div className="btn">
              <span>{"Upload"}</span>
              <input type="file" name="learningObservationFile" />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path validate" name="observationFilename" />
            </div>
          </div>


          <div className="row input-field">
            <p>{"Number of States: "+this.state.numberStates}</p>
            <p className="range-field">
              <input  type="range" name="learningNumberOfStates" defaultValue={3} min={2} max={10}
                      onInput={evt=>{this.setState({numberStates: evt.target.value})}} />
            </p>
          </div>

          <div className="row input-field">
            <p>{"EM Max Iterations: "+this.state.maxIterations}</p>
            <p className="range-field">
              <input  type="range" name="emMaxIterations" defaultValue={4000} min={0} max={8000}
                      onChange={evt=>{this.setState({maxIterations: evt.target.value})}} />
            </p>
          </div>

          <div className="row input-field">
            <p>{"Log Likelihood Change Limit"}</p>
            <input type="number" name="logLikelihoodChangeLimit" step={0.00001} defaultValue={0.001} min={0} />
          </div>

          <button className="btn" type="submit">Run Learning</button>
      </form>
    );
  }
}
