import React from 'react';

const Clear = props => {

    const handleClick = () => {
        props.clear();
        props.setSequence(null);
    }

    return (
        <div>
            <button className="clear" onClick={handleClick}>
                New
        </button>
        </div>
    )
}

export default Clear;