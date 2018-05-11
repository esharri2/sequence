import React, { Component } from 'react';
import Modal from '../Modal'
import GoogleLogin from './GoogleLogin';

const Login = props => {
    const buttonText = "Sign in";
    const bodyText = (
        <div>
            <p>Sign in to save your sequences. We won't save any of your personal information.</p>
            <GoogleLogin toggleAuth={props.toggleAuth} />
        </div>
    );
    return <Modal buttonText={buttonText} title="Sign in" body={bodyText} />
}

export default Login;

