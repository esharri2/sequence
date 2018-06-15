import React, { Component } from 'react';

class Timer extends Component {
    state = { elapsed: 0 };

    audioSource = null;

    duration = (this.props.minutes * 60) + (this.props.seconds);

    tick = () => {
        if (this.state.elapsed + 1 > this.duration) {
            //go to next pose
            this.props.updateIndex(this.props.currentIndex + 1);
        } else {
            //elapse timer for current pose
            this.setState({ elapsed: this.state.elapsed + 1 })
        }
    }

    timer = () => {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    sound = () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const { voice, pitch, rate } = this.props.voiceConfig;
        //Do not play chime if it's not loaded OR browser/os is not allowing sound in window audio context
        if (!this.props.chime || context.state === 'suspended') {
            responsiveVoice.speak(this.props.title, voice, { rate, pitch, onend: this.timer })
        } else {
            const audio = this.props.chime;
            this.audioSource = context.createBufferSource();
            this.audioSource.onended = () => {
                if (!this.props.paused) {
                    responsiveVoice.speak(this.props.title, voice, { rate, pitch, onend: this.timer })
                }
            };
            context.decodeAudioData(audio.slice(0), buffer => {
                this.audioSource.buffer = buffer;
                this.audioSource.connect(context.destination);
                this.audioSource.start(0);
            },
                (e) => { console.log("Error with decoding audio data" + e.err); });
        }
    }

    componentDidMount() {
        this.sound()
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate(prevProps, prevState) {
        //Was paused
        if (prevProps.paused && !this.props.paused) {
            this.timer();
        }
        //Is paused
        else if (!prevProps.paused && this.props.paused) {
            //also stop chime
            this.audioSource.stop();
            clearInterval(this.timerID);
        }
    }

    render() {
        const remainingTotal = this.duration - this.state.elapsed;
        //Minutes and seconds, plus prepend 0 to number if it is single digit
        const remainingMinutes = ("0" + Math.floor(remainingTotal / 60)).slice(-2);
        const remainingSeconds = ("0" + (remainingTotal % 60)).slice(-2);
        return (
            <div className="elapsed">
            <p>{this.props.currentIndex}</p>
                <div className="minutes">{remainingMinutes}: </div>
                <div className="seconds">{remainingSeconds}</div>
            </div>
        )
    }
}

export default Timer;