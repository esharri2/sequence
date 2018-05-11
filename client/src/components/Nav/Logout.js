import React, { Component } from 'react';

const Logout = props => {
    const signOut = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            props.toggleAuth();
        });
    }
    return <button onClick={signOut}>Sign out</button>
}

export default Logout;

