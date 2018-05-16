import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';

//not sure about click event
const Save = props =>
    (<button
        className="save"
        onClick={props.save}>
        <FontAwesomeIcon
            className="icon"
            icon={faSave} />
    </button>)

export default Save;