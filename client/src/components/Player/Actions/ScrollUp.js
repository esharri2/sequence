import React from 'react';

const ScrollUp = () => {

    const scrollUp = () => {
        window.scrollTo(0, 0);   
    }

    return <button aria-label="scroll to top" className="top" onClick={scrollUp}>Back to top</button>
}

export default ScrollUp