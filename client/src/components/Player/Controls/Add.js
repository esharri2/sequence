import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const Add = props =>
    <button aria-label="add pose" lassName="add" onClick={props.add}>
        <FontAwesomeIcon className="icon" icon={faPlus} />Add pose
    </button>

export default Add;