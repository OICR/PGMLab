import React from "react";
import {connect} from "react-redux";
import * as actionCreators from "./redux/action_creators.jsx";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./Header.jsx";
import Body from "./BodyPGMLab.jsx";
import Footer from "./Footer.jsx";

import Dialog from "material-ui/Dialog";
import GoogleLogin from "react-google-login";

class AuthWrapper extends React.Component {
  constructor(props){
    super(props);
    this.getGoogleButton = this.getGoogleButton.bind(this);
  }
  getGoogleButton(){
    // On Google login, validate on backend via id_token. Register into pgmlab.db
    const responseGoogle =
      gAuth => {
        if (gAuth.isSignedIn()) {
          this.props.wamp
            .call("google.auth", [], {
              id_token: gAuth.getAuthResponse().id_token,
              name: gAuth.getBasicProfile().getName(),
              email: gAuth.getBasicProfile().getEmail()
            })
            .then(pgmAuth => pgmAuth ? this.props.signIn(gAuth) : null)
        };
      };
    const clientId = this.props.auth.get("googleClientId");
    return (
      <GoogleLogin clientId={clientId} callback={responseGoogle} cssClass="btn-large waves-effect waves-light blue darken-1">
      </GoogleLogin>
    );
  }
  render(){
    const notSignedIn = !this.props.auth.get("signedIn");
    const actions = [this.getGoogleButton()];
    return (
      <div>
        {
          notSignedIn ?
          <Dialog actions={actions} modal={true} open={true} contentClassName="center-align">
            <span>
            {`Please sign in through Google to continue.`}
            </span>
          </Dialog>
          :null
        }
        <Header auth={this.props.auth}/>
        <Body {...this.props} />
        <Footer />
      </div>
    );
  }
}

export class App extends  React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AuthWrapper {...this.props} />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.get("auth"),
    wamp: state.get("wamp"),
    // Results props
    tasks: state.get("tasks"),
    showFaceted: state.get("showFaceted"),
    typeFilters: state.get("typeFilters"),
    statusFilters: state.get("statusFilters"),
    dateSort: state.get("dateSort"),
    idFilter: state.get("idFilter"),
    // Submit props
    snackbarMessage: state.get("snackbarMessage")
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)
