import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';

const Play = props => props.paused || !props.playing
    ? <button className="play" onClick={props.play}><FontAwesomeIcon className="icon" icon={faPlay}/></button>
    : <button className="pause" onClick={props.pause}><FontAwesomeIcon className="icon" icon={faPause}/></button>

export default Play;