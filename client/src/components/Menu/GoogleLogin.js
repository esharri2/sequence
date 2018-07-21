import React, { Component } from 'react';
import Loader from './Loader.js';
import api from "../../utils/api";

class GoogleLogin extends Component {

    state = {
        signedIntoGoogle: null
    }

    //check to see if user is signed in to Google
    componentDidMount() {
        gapi.load('auth2', () => {
            gapi.auth2.init().then(auth2 => {
                if (auth2.isSignedIn.get()) {
                    this.onSignIn(auth2.currentUser.get());                   
                } else {
                    this.setState({ signedIntoGoogle: false })
                }
            })
        });
    }

    componentDidUpdate() {
        if (this.state.signedIntoGoogle === false) {
            console.log("yo")
            gapi.signin2.render('g-signin2', {
                'scope': 'profile email',
                'onsuccess': this.onSignIn,
                'onfailure': this.onFailure,
            });
        } 
    }

    onSignIn = (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        api.signin(id_token).then(userData => {
            this.props.toggleAuth();
        });
    }
    onFailure = (error) => {
        alert(error);
        console.log(error);
    }

    render() {  
        return (
            <div>
                {this.state.signedIntoGoogle === false ? <div id="g-signin2" data-theme="dark"></div> : <Loader/>}
            </div>
        )
    }
}



export default GoogleLogin;