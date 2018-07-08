import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faStop from '@fortawesome/fontawesome-free-solid/faStop';

const Stop = props =>
    <button aria-label="stop" className="stop" disabled={props.playing?false:true} onClick={props.stop}>
        <FontAwesomeIcon className="icon" icon={faStop} />
        Stop 
</button>

export default Stop;