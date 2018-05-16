import React, { Component } from 'react';
import api from "../../utils/api";

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
        var id_token = googleUser.getAuthResponse().id_token;
        api.signin(id_token).then(userData => {
            this.props.toggleAuth();
        });
    }
    onFailure = (error) => {
        console.log(error);
    }

    render() {
        return <div id="g-signin2" data-theme="dark"></div>
    }

}

export default GoogleLogin;