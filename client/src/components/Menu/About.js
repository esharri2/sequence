import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class About extends Component {
    state = {
        modalIsOpen: false
    }

    componentWillMount() {
        Modal.setAppElement(document.getElementById('root'));
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>About</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.getSequences}
                    onRequestClose={this.closeModal}
                    className="modal-content"
                    overlayClassName="modal"
                    contentLabel="About"
                >
                    <button className="close-modal" onClick={this.closeModal} >
                        <FontAwesomeIcon className="icon close-modal" icon="times" />
                    </button>
                    <h2>About</h2>
                    <div className="modal-body">
                        <p>Sequence is a talking timer for yoga and exercise. Build a series of poses, set a duration for each pose, and then listen to the timer guide you from one pose to the next.</p>                                                        
                    </div>
                </Modal>
            </div>

        )
    }

    // const buttonText = "About";
    // const body = <div><p>Sequence is a talking timer for yoga and exercise. You can build sequences, set durations for each activity, and then let it guide you during your workout. You can sign in to save your favorite sequences.</p></div>
    // return <Modal buttonText={buttonText} title="About" body={body} />
}

export default About;

