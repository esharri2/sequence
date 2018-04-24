import React, { Component } from 'react';
import Modal from '../Modal';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import questionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle';


const Help = () => {
    const buttonText = "About";
    const body = <div><p>Sequence is a talking timer for yoga and exercise. You can build sequences, set durations for each activity, and then let it guide you during your workout. You can sign in to save your favorite sequences.</p></div>
    return <Modal buttonText={buttonText} title="About" body={body} />
}

export default Help;

