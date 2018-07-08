import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
// import faPause from '@fortawesome/fontawesome-free-solid/faPause';

const Play = props => props.paused || !props.playing
    ? <button aria-label="play" className="play" onClick={props.play}><FontAwesomeIcon className="icon" icon="play"/>Play</button>
    : <button aria-label="pause" className="pause" onClick={props.pause}><FontAwesomeIcon className="icon" icon="pause"/>Pause</button>

export default Play;