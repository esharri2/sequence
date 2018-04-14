import React from 'react';
import Timer from './Timer';
import Move from './Move';

const Action = props => {
    const { title, duration } = props.action;
    const durationMinutes = Math.floor((duration) / 60);
    const durationSeconds = (duration) % 60;

    return (
        <div className="action">
            <div className="title input-container">
                <input
                    onChange={props.handleActionsChange}
                    name="title"
                    placeholder="Action"
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
                        updateIndex={props.updateIndex}
                        paused={props.paused} />
                    : <div className="time-input-container">
                        <div className="time-input">
                            <input
                                onChange={props.handleActionsChange}
                                name="minutes"
                                placeholder="Min"
                                type="number"
                                data-index={props.actionIndex}
                                value={durationMinutes}
                                min="0" />
                            <label>Min</label>
                        </div>
                        <div className="time-input">
                            <input
                                onChange={props.handleActionsChange}
                                name="seconds"
                                placeholder="Sec"
                                type="number"
                                data-index={props.actionIndex}
                                value={durationSeconds}
                                min="0" />
                            <label>Sec</label>
                        </div>
                    </div>
                }
            </div>
            <Move
                changeActionIndex={props.changeActionIndex}
                length={props.length}
                index={props.actionIndex} />
        </div>
    )
}

export default Action;