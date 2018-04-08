import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';

class Player extends Component {
    state = {
        playing: false,
        paused: false,
        sequenceTitle: "Test sequence",
        sequenceDescription: "a fake sequence to use for testing",
        actions: [
            { title: "do this", duration: 62 },
            { title: "do that", duration: 40 },
            { title: "do a last thing", duration: 80 }
        ],
        currentIndex: 0
    }

    togglePlay = () => {
        //this wrong ... need start play pause, stop
        this.state.playing ? this.setState({ playing: false }) : this.setState({ playing: true })
    }

    updateIndex = (index) => {
        this.setState({ currentIndex: index })
    }

    handleInputChange = event => {
        let { name, value, dataset } = event.target;
        const newActions = this.state.actions.map((action, index) => {
            if (index === parseInt(dataset.index)) {
                const minutes = Math.floor(action.duration / 60);
                const seconds = Math.floor(action.duration % 60);
                if (name === "seconds") {
                    name = "duration";
                    value = (minutes * 60) + parseInt(value);
                } else if (name === "minutes") {
                    name = "duration";
                    value = seconds + parseInt(value) * 60;
                }
                action[name] = value;
            }
            return action
        });
        this.setState({ actions: newActions });
    }

    render() {
        return (
            <div className="player">
                <Title title={this.state.sequenceTitle} />
                <Controls
                    togglePlay={this.togglePlay}
                    updateIndex={this.updateIndex} />
                <Actions
                    actions={this.state.actions}
                    playing={this.state.playing}
                    currentIndex={this.state.currentIndex}
                    updateIndex={this.updateIndex}
                    handleInputChange={this.handleInputChange} />
            </div>
        )
    }
}

export default Player;