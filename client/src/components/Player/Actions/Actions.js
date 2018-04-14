import React from 'react';
import Action from './Action';

const Actions = (props) =>
    <div className="actions">
        {props.actions.map((action, index) =>
            <Action
                handleActionsChange={props.handleActionsChange}
                changeActionIndex={props.changeActionIndex}
                updateIndex={props.updateIndex}
                action={action}
                actionIndex={index}
                length={props.length}
                currentIndex={props.currentIndex}
                playing={props.playing}
                paused={props.paused}
                voiceConfig={props.voiceConfig}
                key={index} />)}
    </div>;

export default Actions;