import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';
import Add from './Add';

class Player extends Component {
    state = {
        playing: false,
        paused: false,
        sequenceTitle: "Test sequence",
        sequenceDescription: "a fake sequence to use for testing",
        actions: [
            { title: "test", duration: 666 },
            { title: "doopy doo", duration: 3 },
            { title: "petoo petoo", duration: 3 },
            { title: "doooooo", duration: 5 },
            { title: "daaaaaa", duration: 8 }
        ],
        currentIndex: 0,
        voice: "US English Female",
        rate: 1,
        pitch: 1
    }

    componentDidUpdate() {
        //Check for end of sequence; playing ending message
        if (this.state.currentIndex === this.state.actions.length && this.state.playing) {
            const { voice, pitch, rate } = this.state;
            responsiveVoice.speak("Your sequence is over", voice, { rate, pitch, onend: this.stop });
        }
    }

    play = () => {
        this.setState({ playing: true, paused: false })
    }

    pause = () => {
        responsiveVoice.cancel();
        this.setState({ paused: true })
    }

    stop = () => {
        responsiveVoice.cancel();
        this.setState({ currentIndex: 0, playing: false })
    }

    clear = () => {
        this.setState({ actions: [] })
    }

    save = () => {
        alert("save!")
    }

    add = () => {
        this.setState({ actions: [...this.state.actions, { title: "", duration: 30 }] });
    }

    remove = (index) => {
        const newArray = [...this.state.actions];
        newArray.splice(index,1);
        this.setState({ actions: newArray });
    }

    //Change the index of playing session
    updateIndex = (index) => {
        this.setState({ currentIndex: index })
    }

    //Change the index of an action in the actions array
    changeActionIndex = (oldIndex, newIndex) => {
        const newActions = [...this.state.actions];
        newActions.splice(newIndex, 0, newActions.splice(oldIndex, 1)[0]);
        this.setState({ actions: newActions })
    }

    //Handle changes to sequence details
    handleSequenceChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    //Handle changes to name, minutes, and seconds of actions and update actions
    handleActionsChange = event => {
        let { name, value, dataset } = event.target;
        const newActions = this.state.actions.map((action, index) => {
            if (index === parseInt(dataset.index)) {
                const minutes = Math.floor(action.duration / 60);
                const seconds = Math.floor(action.duration % 60);
                if (name === "seconds") {
                    if (!value) {
                        value = 0;
                    }
                    name = "duration";
                    value = (minutes * 60) + parseInt(value);
                } else if (name === "minutes") {
                    if (!value) {
                        value = 0;
                    }
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
                <Title
                    title={this.state.sequenceTitle}
                    handleSequenceChange={this.handleSequenceChange} />
                <Controls
                    play={this.play}
                    pause={this.pause}
                    stop={this.stop}
                    clear={this.clear}
                    save={this.save}
                    paused={this.state.paused}
                    playing={this.state.playing}
                />
                <Actions
                    actions={this.state.actions}
                    playing={this.state.playing}
                    paused={this.state.paused}
                    length={this.state.actions.length}
                    voiceConfig={voiceConfig}
                    currentIndex={this.state.currentIndex}
                    updateIndex={this.updateIndex}
                    handleActionsChange={this.handleActionsChange}
                    changeActionIndex={this.changeActionIndex}
                    remove={this.remove}                    
                />
                <Add add={this.add} />
            </div>
        )
    }
}

export default Player;