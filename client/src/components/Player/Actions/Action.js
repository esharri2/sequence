import React from 'react';
import Timer from './Timer';

const Action = props => {
    const { title, duration } = props.action;
    const durationMinutes = Math.floor((duration) / 60);
    const durationSeconds = (duration) % 60;

    return (
        <div className="action">
            <div className="title">
                <input 
                    onChange={props.handleInputChange}
                    name="title"
                    type="text"
                    value={title}
                    data-index={props.actionIndex} />
            </div>
            <div className="time">
                {props.currentIndex === props.actionIndex && props.playing
                    ? <Timer
                        title={title}
                        minutes={durationMinutes}
                        seconds={durationSeconds}
                        currentIndex={props.currentIndex}
                        voiceConfig={props.voiceConfig}
                        updateIndex={props.updateIndex} />
                    : <div>
                        <input
                            onChange={props.handleInputChange}
                            name="minutes"
                            type="number"
                            data-index={props.actionIndex}
                            value={durationMinutes}
                            min="0" />
                        <input
                            onChange={props.handleInputChange}
                            name="seconds"
                            type="number"
                            data-index={props.actionIndex}
                            value={durationSeconds}
                            min="0" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Action;