import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Move = props => {

    const handleClick = (change) => {
        props.changeActionIndex(props.index, props.index + change);
    }

    return (
        <div className="move input-container">
            {props.index !== 0 ? <button aria-label="move up" disabled={props.playing} onClick={() => handleClick(-1)}>
                <FontAwesomeIcon className="icon" icon="angle-up" />
            </button> : null}
            {props.index !== (props.length - 1) ? <button aria-label="move down" disabled={props.playing} onClick={() => handleClick(1)}>
                <FontAwesomeIcon className="icon" icon="angle-down" />
            </button> : null}
        </div>)
}

export default Move;