import React, { Component } from 'react';
import Player from './Player';

class App extends Component {

    state = {
        sequence: {
            title: "Test sequence",
            description:"a fake sequence to use for testing",
            actions: [
                { title: "do this", duration: 2000 },
                { title: "do that", duration: 4000 },
                { title: "do a last thing", duration: 6000 }
            ]
        }
    }

    render() {
        return <Player sequence={this.state.sequence} />
    }
}

export default App;