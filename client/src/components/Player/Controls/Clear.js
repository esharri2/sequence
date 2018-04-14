import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashalt from '@fortawesome/fontawesome-free-solid/faTrashalt';

const Clear = props =>
    <button className="clear" onClick={props.clear}>
        <FontAwesomeIcon className="icon" icon={faTrashalt} />
    </button>

export default Clear;