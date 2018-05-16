import React, { Component } from 'react';
import Splash from './Splash'
import Player from './Player';
import Nav from './Nav';
import api from '../utils/api'

class App extends Component {
    state = {
        showSplash: false,
        authenticated: false,
        sequenceId: null,
    }

    componentDidMount() {
        //sign in check!!!! are you signed in?
    }    

    enter = () => {
        this.setState({ showSplash: false })
    }

    toggleAuth = () => {
        this.state.authenticated
            ? this.setState({ authenticated: false })
            : this.setState({ authenticated: true })
    }

    setSequence = (sequenceId) => {
        this.setState({sequenceId})
    }
  
    render() {
        const components = this.state.showSplash
            ? <div className="app"><Splash enter={this.enter} /></div>
            : <div className="app">
                <Nav authenticated={this.state.authenticated} toggleAuth={this.toggleAuth} setSequence={this.setSequence} /> 
                <Player authenticated={this.state.authenticated} sequenceId={this.state.sequenceId} setSequence={this.setSequence} />
            </div>;
        return components
    }
}


export default App;