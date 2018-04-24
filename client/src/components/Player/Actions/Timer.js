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

    timer = () => {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    sound = () => {
        const { voice, pitch, rate } = this.props.voiceConfig;
        responsiveVoice.speak(this.props.title, voice, { rate, pitch, onend: this.timer });
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
            console.log('was paused')
            this.timer();
        }
        //Is paused
        else if (!prevProps.paused && this.props.paused) {
            console.log('is paused')
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