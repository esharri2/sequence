import React from 'react';
import Play from './Play';
import Save from './Save';
import Stop from './Stop';
import Clear from './Clear';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'





function Controls(props) {
    return (
        <div className="controls">
            <Play icon={faCoffee} play={props.play} pause={props.pause} paused={props.paused} playing={props.playing} />
            <Stop stop={props.stop} />
            <Clear clear={props.clear} />
            <Save save={props.save} />
        </div>
    )
}

export default Controls;