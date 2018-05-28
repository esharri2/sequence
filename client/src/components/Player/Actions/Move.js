import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleup from '@fortawesome/fontawesome-free-solid/faAngleup';
import faAngledown from '@fortawesome/fontawesome-free-solid/faAngledown';

const Move = props => {

    console.log("props playing", props.playing)

    const handleClick = (change) => {
        props.changeActionIndex(props.index, props.index + change);
    }

    return (
        <div className="move input-container">
            {props.index !== 0 ? <button disabled={props.playing} onClick={() => handleClick(-1)}>
                <FontAwesomeIcon className="icon" icon={faAngleup} />
            </button> : null}
            {props.index !== (props.length - 1) ? <button disabled={props.playing} onClick={() => handleClick(1)}>
                <FontAwesomeIcon className="icon" icon={faAngledown} />
            </button> : null}
        </div>)
}

export default Move;