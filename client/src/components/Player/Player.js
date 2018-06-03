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
        currentIndex: 0,
        voice: "US English Male",
        rate: .7,
        pitch: 2
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
                <Title
                    title={this.props.title}
                    handleSequenceChange={this.props.handleSequenceChange}
                />
                <Controls
                    play={this.play}
                    pause={this.pause}
                    stop={this.stop}                   
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
                <Add add={this.props.add} />
            </div>
        )
    }
}

export default Player;