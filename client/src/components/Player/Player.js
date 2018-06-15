import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';

class Player extends Component {
    state = {
        playing: false,
        paused: false,
        currentIndex: 0,
        voice: "US English Female",
        rate: 1,
        pitch: 1
    }

    componentDidUpdate(prevProps) {
        //The sequence is over; play ending message
        if (this.state.currentIndex === this.props.actions.length && this.state.playing) {
            const { voice, pitch, rate } = this.state;
            responsiveVoice.speak("Your sequence is over", voice, { rate, pitch, onend: this.stop });
        }
        //Stop everything if user has switched sequences during playing
        if (prevProps.sequenceId !== this.props.sequenceId) {
            this.stop();
        }
    }

    play = () => {
        responsiveVoice.speak("");
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

    //Change the index of playing session
    updateIndex = (index) => {
        this.setState({ currentIndex: index })
    }

    render() {
        
        const voiceConfig = { voice: this.state.voice, pitch: this.state.pitch, rate: this.state.rate }
        return (
            <div className="player">
            {this.state.currentIndex}
                <Title
                    title={this.props.title}
                    handleSequenceChange={this.props.handleSequenceChange}
                />
                <Controls
                    play={this.play}
                    pause={this.pause}
                    stop={this.stop}
                    add={this.props.add}
                    paused={this.state.paused}
                    playing={this.state.playing}
                    clear={this.props.clear}
                    save={this.props.save}
                    unsaved={this.props.unsaved}
                    setSequence={this.props.setSequence}
                    authenticated={this.props.authenticated}
                />
                <Actions
                    title={this.props.title}
                    actions={this.props.actions}
                    playing={this.state.playing}
                    paused={this.state.paused}
                    length={this.props.actions.length}
                    voiceConfig={voiceConfig}
                    currentIndex={this.state.currentIndex}
                    updateIndex={this.updateIndex}
                    handleActionsChange={this.props.handleActionsChange}
                    changeActionIndex={this.props.changeActionIndex}
                    remove={this.props.remove}
                    sequenceId={this.props.sequenceId}
                />
            </div>
        )
    }
}

export default Player;