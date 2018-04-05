import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';

class Player extends Component {
    state = {
        sequence: {
            title: "Test sequence",
            description: "a fake sequence to use for testing",
            actions: [
                { title: "do this", duration: 2000 },
                { title: "do that", duration: 4000 },
                { title: "do a last thing", duration: 6000 }
            ]
        },
        playing: false,
        index: 0
    }

    togglePlay = () => {
        this.state.playing ? this.setState({ playing: false }) : this.setState({ playing: true })
    }

    updateIndex = (index) => {
        this.setState({ index: index })
    }

    render() {
        return (
            <div className="player">
                <Title title={this.state.sequence.title} />
                <Controls togglePlay={this.togglePlay} updateIndex={this.updateIndex} />
                <Actions actions={this.state.sequence.actions} playing={this.state.playing} index={this.state.index} />
            </div>
        )
    }
}

export default Player;