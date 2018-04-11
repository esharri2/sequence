import React from 'react';
import Action from './Action';

const Actions = (props) =>
    <div className="actions">
        {props.actions.map((action, index) =>
            <Action
                handleInputChange={props.handleInputChange}
                updateIndex={props.updateIndex}
                action={action}
                actionIndex={index}
                currentIndex={props.currentIndex}
                playing={props.playing}
                voiceConfig={props.voiceConfig}
                key={action.title + index} />)}
    </div>;

export default Actions;