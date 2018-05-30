import React from 'react';
import Timer from './Timer';
import Move from './Move';
import Remove from './Remove';

const Action = props => {
    const { title, duration } = props.action;
    const durationMinutes = Math.floor((duration) / 60);
    const durationSeconds = (duration) % 60;
    //Set boolean to show if this action is playing
    let active = false;
    if (props.currentIndex === props.actionIndex && props.playing) {
        active = true;
    }

    return (
        <div className={`action ${active ? "active" : "inactive"}`}>
            <div className="title input-container">
                <input
                    onChange={props.handleActionsChange}
                    name="title"
                    placeholder={`Pose ${props.actionIndex + 1}`}
                    type="text"
                    value={title}
                    data-index={props.actionIndex} />
            </div>
            <div className="time">
                {active
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
                                onFocus={e => e.target.select()}
                                name="minutes"
                                placeholder="Min"
                                type="number"
                                data-index={props.actionIndex}
                                value={durationMinutes}
                                min="0" />
                            <label>m</label>
                        </div>
                        <div className="time-input">
                            <input
                                onChange={props.handleActionsChange}
                                onFocus={e => e.target.select()}
                                name="seconds"
                                placeholder="Sec"
                                type="number"
                                data-index={props.actionIndex}
                                value={durationSeconds}
                                min="0" />
                            <label>s</label>
                        </div>
                    </div>
                }
            </div>
            <Move
                changeActionIndex={props.changeActionIndex}
                length={props.length}
                index={props.actionIndex}
                playing={props.playing} />
            <Remove
                remove={props.remove}
                actionIndex={props.actionIndex}
                playing={props.playing} />
        </div>
    )
}

export default Action;