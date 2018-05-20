import React, { Component } from 'react';
import Modal from 'react-modal';
import GoogleLogin from './GoogleLogin';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';


class Login extends Component {
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
                <button onClick={this.openModal}>Sign in</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.getSequences}
                    onRequestClose={this.closeModal}
                    className="modal-content"
                    overlayClassName="modal"
                    contentLabel="Sign in"
                >
                    <button className="close-modal" onClick={this.closeModal} >
                        <FontAwesomeIcon className="icon close-modal" icon={faTimes} />
                    </button>
                    <h2>Sign in</h2>
                    <div>
                        <p>Sign in to save your sequences. We won't save any of your personal information.</p>
                        <GoogleLogin toggleAuth={this.props.toggleAuth} />
                    </div>
                </Modal>
            </div>

        )
    }
}

export default Login;

