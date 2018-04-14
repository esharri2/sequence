import React from 'react';

const Title = (props) => {
    console.log(props);
    return (
        <div className="sequenceTitle">
            <input 
                onChange={props.handleSequenceChange} 
                type="text" 
                name="sequenceTitle" 
                value={props.title} />
                </div>
    )
}

export default Title;