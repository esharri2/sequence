import React from 'react';

const Splash = props => {
    let option;
    //Show loader while auth is unknown
    if (props.authenticated === null) {
        option = <div className="loader"></div>
        //Show enter button is unauthorized
    } else if (props.authenticated === false) {
        option = <button onClick={props.enter}>Begin</button>
    }

    return (
        <div className="splash">
            <h1 className="logo">Sequence</h1>
            <h2>A talking timer for your yoga practice</h2>
            <div className="enter">{option}</div>
        </div>
    )

}

export default Splash;