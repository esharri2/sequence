import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { elapsed: 0 };
        //Global variable for audio source
        this.audioSource = null;
    }

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
        const { voice, pitch, rate } = this.props.voiceConfig;
        // const this.props.ctx = new (window.AudioContext || window.webkitAudioContext)();
        
        const audio = this.props.chime;
        this.audioSource = this.props.ctx.createBufferSource();
        this.audioSource.onended = () => {
            if (!this.props.paused) {
                responsiveVoice.speak(this.props.title, voice, { rate, pitch, onend: this.timer })
            }
        };
        this.props.ctx.decodeAudioData(audio.slice(0), buffer => {
            this.audioSource.buffer = buffer;
            this.audioSource.connect(this.props.ctx.destination);
            this.audioSource.start(0);
        },
            (e) => { console.log("Error with decoding audio data" + e.err); });
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
                <div className="minutes">{remainingMinutes}: </div>
                <div className="seconds">{remainingSeconds}</div>
            </div>
        )
    }
}

export default Timer;