import React, { Component } from 'react';
import api from '../../utils/api';

const Logout = props => {
    const signOut = () => {
        api.signout().then((res) => {
            props.toggleAuth();
        })
    }
    return <button onClick={signOut}>Sign out</button>
}

export default Logout;

