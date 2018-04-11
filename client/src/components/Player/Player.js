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
            { title: "do this", duration: 3 },
            { title: "do that", duration: 3 },
            { title: "do a last thing", duration: 3 }
        ],
        currentIndex: 0,
        voice: "US English Female",
        rate: 1,
        pitch: 1
    }


    componentDidUpdate() {
        if (this.state.currentIndex === this.state.actions.length) {
            const { voice, pitch, rate } = this.state;
            responsiveVoice.speak("Your sequence is over", voice, { rate, pitch, onend: this.stop });
        }
    }

    play = () => {
        //this wrong ... need start play pause, stop
        this.state.playing ? this.setState({ playing: false }) : this.setState({ playing: true })
    }

    stop = () => {
        this.setState({ currentIndex: 0, playing: false })
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
        const voiceConfig = { voice: this.state.voice, pitch: this.state.pitch, rate: this.state.rate }
        return (
            <div className="player">
                <Title title={this.state.sequenceTitle} />
                <Controls play={this.play} />
                <Actions
                    actions={this.state.actions}
                    playing={this.state.playing}
                    voiceConfig={voiceConfig}
                    currentIndex={this.state.currentIndex}
                    updateIndex={this.updateIndex}
                    handleInputChange={this.handleInputChange}
                />
            </div>
        )
    }
}

export default Player;