import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';
import Add from './Add';
import api from '../../utils/api'

class Player extends Component {
    state = {
        playing: false,
        paused: false,
        unsaved: false,
        title: "",
        actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }],
        currentIndex: 0,
        voice: "US English Male",
        rate: 1,
        pitch: 1
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sequenceId !== this.props.sequenceId) {
            //User has cleared a saved sequence
            if (!this.props.sequenceId) {
                this.setState({ title: "", actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }] })
            }
            //User has saved or loaded a sequence
            else {
                api.getSequence(this.props.sequenceId).then(sequence => {
                    const { title, actions } = sequence.data;
                    this.setState({ title, actions, unsaved: false });
                })
            }
        }
        //The sequence is over; play ending message
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
        //might need to clear id and stuff too?~~~
        this.setState({ title: "", actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }] })
    }

    save = () => {
        const sequence = {
            //TODO there might not be a title for a new thing at this point? check.
            title: this.state.title,
            actions: this.state.actions
        }
        if (this.props.sequenceId) {
            console.log("update!")
            api.update(this.props.sequenceId, sequence).then(() => this.setState({ unsaved: false }))
        } else {
            //TODO don't need user ID were derp is
            api.save("derp", sequence).then(res => {
                this.props.setSequence(res.data.id)
            })
        }
    }

    add = () => {
        this.setState({ actions: [...this.state.actions, { title: "", duration: 30 }] });
    }

    remove = (index) => {
        const newArray = [...this.state.actions];
        newArray.splice(index, 1);
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
        this.setState({ actions: newActions, unsaved: true })
    }

    //Handle changes to sequence details
    handleSequenceChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value, unsaved: true });
    }

    //Handle changes to name, minutes, and seconds of actions
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
        this.setState({ actions: newActions, unsaved: true });
    }

    render() {
        const voiceConfig = { voice: this.state.voice, pitch: this.state.pitch, rate: this.state.rate }
        return (
            <div className="player">
                <Title
                    title={this.state.title}
                    handleSequenceChange={this.handleSequenceChange}
                />
                <Controls
                    play={this.play}
                    pause={this.pause}
                    stop={this.stop}
                    clear={this.clear}
                    save={this.save}
                    paused={this.state.paused}
                    playing={this.state.playing}
                    unsaved={this.state.unsaved}
                    setSequence={this.props.setSequence}
                    authenticated={this.props.authenticated}
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