import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faStop from '@fortawesome/fontawesome-free-solid/faStop';

const Stop = props => <button className="stop" onClick={props.stop}><FontAwesomeIcon className="icon" icon={faStop}/></button>

export default Stop;