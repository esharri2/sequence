import React from 'react';


const Splash = props => <div onClick={props.enter} className="splash">
    <h1 className="logo">Sequence</h1>
    <div className="radial"></div>
    <h2>A talking timer for your yoga practice</h2>
</div>

export default Splash;