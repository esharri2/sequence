import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const Clear = props => {

    const handleClick = () => {
        // props.clear();
        props.setSequence(null);
    }

    return (
        <button className="clear" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            New sequence
        </button>
    )
}

export default Clear;