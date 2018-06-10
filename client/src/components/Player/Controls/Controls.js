import React from 'react';
import Play from './Play';
import Save from './Save';
import Stop from './Stop';
import Add from './Add';

// import Clear from './Clear';

const Controls = (props) => {
    return (
        <div className="controls">
            <div className="main">
                <Play play={props.play} pause={props.pause} paused={props.paused} playing={props.playing} />
                <Stop stop={props.stop} playing={props.playing} />
                {/* add conditioanls */}
                {props.authenticated ? <Save save={props.save} unsaved={props.unsaved} /> : null}

            </div>
            <div className="sub">
                <Add add={props.add} />           </div>
        </div>
    )
}

export default Controls;