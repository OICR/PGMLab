import React from "react"
import {connect} from "react-redux"
import {mapStateToProps} from "./redux/initial.jsx";
import * as actionCreators from "./redux/action_creators.jsx"

import Header from "./Header.jsx"
import Body from "./Body.jsx"
import Footer from "./Footer.jsx"

import Dialog from "material-ui/Dialog"
import GoogleLogin from "react-google-login"

class GoogleButton extends React.Component {
  constructor(props){
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this)
  }
  responseGoogle(gAuth){
    if (gAuth.isSignedIn()) {
      const idToken = gAuth.getAuthResponse().id_token
      const name = gAuth.getBasicProfile().getName()
      const email = gAuth.getBasicProfile().getEmail()
      this.props.loginWithGoogle(idToken, name, email)
        .then(results => {
          const [loginResult, userUploads, userObservations, userPathways] = results
          if (loginResult!=null) {
            this.props.signInPGM(gAuth, userUploads, userObservations, userPathways)
          }
          else {
            window.alert("Unable to register/login via Google")
            console.log("Unable to register/login via Google")
          }
        })
    }
    else {
      window.alert("Unable to authenticate your Google account. Try again")
      console.log("Unable to authenticate Google account")
    }
  }
  render(){
    const clientId = this.props.auth.get("googleClientId");
    return (<GoogleLogin clientId={clientId} callback={this.responseGoogle} />)
  }
}

class AuthModal extends React.Component {
  render(){
    return (
      <Dialog modal={true} open={!this.props.auth.get("signedIn")}
          actions={[<GoogleButton {...this.props} />]}>
        <h5 className="center-align">
        {"Please sign in through Google to Continue"}
        </h5>
      </Dialog>
    )
  }
}

export class App extends React.Component {
    render(){
      return (
        <div>
          <AuthModal
              auth = {this.props.auth}
              loginWithGoogle = {this.props.wamp.loginWithGoogle}
              signInPGM = {this.props.signInPGM}
          />
          <Header
              auth = {this.props.auth}
              signOut = {this.props.signOut}

              uploadFile = {this.props.uploadFile}
              onUploadSuccess={this.props.onUploadSuccess}
              uploads = {this.props.uploads}
              uploadModalOpen = {this.props.uploadModalOpen}
              toggleUploadModal = {this.props.toggleUploadModal}

              view = {this.props.view}
              changeView = {this.props.changeView}

              resultsCount = {this.props.results.size}
          />
          <Body
              view = {this.props.view}
              runType = {this.props.runType}
              changeRunType = {this.props.changeRunType}

              dataspace = {this.props.dataspace}
              dataspaceModals = {this.props.dataspaceModals}
              toggleDataspaceModal = {this.props.toggleDataspaceModal}

              observations = {this.props.observations}
              selectObservationSet = {this.props.selectObservationSet}
              selectObservation = {this.props.selectObservation}

              pathways = {this.props.pathways}
              selectPathway = {this.props.selectPathway}
              updatePathwaysModalFilters = {this.props.updatePathwaysModalFilters}
              getReactomePathway = {this.props.wamp.getReactomePathway}

              graphVis = {this.props.graphVis}
              graphVisSelectPathway = {this.props.graphVisSelectPathway}
              graphVisSelectObservation = {this.props.graphVisSelectObservation}

              results = {this.props.results}
              onInferenceSuccess = {this.props.onInferenceSuccess}
              heatmap = {this.props.heatmap}
              heatmapSelectResult = {this.props.heatmapSelectResult}
              heatmapSelectPathway = {this.props.heatmapSelectPathway}
              heatmapSelectState = {this.props.heatmapSelectState}
          />
          <Footer />
        </div>
      )
    }
};

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
