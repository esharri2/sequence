import React, { Component } from 'react';
import Splash from './Splash'
import Player from './Player';
import Nav from './Nav';



class App extends Component {
    state = {
        showSplash: false
    }

    enter = () => {
        this.setState({showSplash:false})
    }

    render() {
        const components = this.state.showSplash
            ? <div className="app"><Splash enter={this.enter} /></div>
            : <div className="app"><Nav /> <Player /></div>;
        return components
    }
}


export default App;