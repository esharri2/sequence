import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const Remove = props => {

    const handleClick = () => {
        props.remove(props.actionIndex)
    }

    return <div className="remove">
        <button aria-label="remove pose"  disabled={props.playing} onClick={handleClick}>
            <FontAwesomeIcon className="icon remove" icon={faTimes} />
        </button>
    </div>
}


export default Remove;