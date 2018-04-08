import React from 'react';
import Play from './Play';
import Stop from './Stop';


function Controls(props) {
    return (
        <div className="controls">
            <Play togglePlay={props.togglePlay} />
            <Stop updateIndex={props.updateIndex} />
        </div>
    )
}

export default Controls;