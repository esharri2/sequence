import React, { Component } from 'react';

class GoogleLogin extends Component {

    componentDidMount() {
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            // 'width': 200,
            // 'height': 50,
            // 'longtitle': true,
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure,
        });
    }

    onSignIn = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }
    onFailure = (error) => {
        console.log(error);
    }

    render() {
        return <div id="g-signin2" data-theme="dark">button</div>
    }

}

export default GoogleLogin;