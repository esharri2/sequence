import React from 'react';

const ScrollUp = () => {

    const scrollUp = () => {
        window.scrollTo(0, 0);
   
    }


    return <button className="top" onClick={scrollUp}>Back to top</button>
}

export default ScrollUp