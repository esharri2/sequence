import React from 'react';

const Title = (props) => {    
    return (
        <div className="sequenceTitle">
            <input
                aria-label="Sequence title"
                onChange={props.handleSequenceChange}
                type="text"
                name="title"
                placeholder="Name your sequence"
                value={props.title} />
        </div>
    )
}

export default Title;