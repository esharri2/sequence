import React, { Component } from 'react';
import Modal from '../Modal'
import GoogleLogin from './GoogleLogin';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import signIn from '@fortawesome/fontawesome-free-solid/faSignInAlt';



const Login = () => {
    const buttonText = "Sign in";
    const bodyText = <div><p>Sign in to save your sequences. We won't save any of your personal information.</p><GoogleLogin /></div>;
    return <Modal buttonText={buttonText} title="Sign in" body={bodyText} />
}

export default Login;

