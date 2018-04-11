import React, { Component } from 'react';

class Timer extends Component {
    state = {
        elapsed: 0
    }

    duration = (this.props.minutes * 60) + (this.props.seconds);

    tick = () => {  
        if (this.state.elapsed + 1 > this.duration) {
            this.props.updateIndex(this.props.currentIndex + 1);
        } else {
            this.setState({ elapsed: this.state.elapsed + 1 })
        }
    }

    speech = () => {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentDidMount() {
        const { voice, pitch, rate } = this.props.voiceConfig;
        responsiveVoice.speak(this.props.title, voice, { rate, pitch, onend: this.speech });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const remainingTotal = this.duration - this.state.elapsed;
        const remainingMinutes = Math.floor(remainingTotal / 60);
        const remainingSeconds = remainingTotal % 60;
        return (
            <div className="elapsed">
                <div className="minutes">{remainingMinutes}</div>
                <div className="seconds">{remainingSeconds}</div>
            </div>
        )
    }
}

export default Timer;