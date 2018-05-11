import React, { Component } from 'react';
import Splash from './Splash'
import Player from './Player';
import Nav from './Nav';
import api from '../utils/api'

class App extends Component {
    state = {
        showSplash: false,
        authenticated: false
    }

    componentDidMount() {
        //sign in check!!!! are you signed in?
    }

    enter = () => {
        this.setState({ showSplash: false })
    }

    toggleAuth = () => {
        console.log('imma toggle auth!')
        this.state.authenticated
            ? this.setState({ authenticated: false })
            : this.setState({ authenticated: true })
    }

    render() {
        const components = this.state.showSplash
            ? <div className="app"><Splash enter={this.enter} /></div>
            : <div className="app">
                <Nav authenticated={this.state.authenticated} toggleAuth={this.toggleAuth} /> 
                <Player authenticated={this.state.authenticated} />
            </div>;
        return components
    }
}


export default App;