import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';

//not sure about click event
const Save = props =>
    (<button
        className="save"
        aria-label="save"
        onClick={props.save}
        disabled={props.unsaved ? false : true}>
        <FontAwesomeIcon className="icon" icon="save" />
        Save
    </button>)

export default Save;