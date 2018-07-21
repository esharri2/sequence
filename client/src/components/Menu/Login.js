import React, { Component } from 'react';
import Modal from 'react-modal';
import GoogleLogin from './GoogleLogin';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Login extends Component {
    state = {
        modalIsOpen: false,
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
                    onRequestClose={this.closeModal}
                    className="modal-content"
                    overlayClassName="modal"
                    contentLabel="Sign in"
                >
                    <button className="close-modal" onClick={this.closeModal} >
                        <FontAwesomeIcon className="icon close-modal" icon="times" />
                    </button>
                    <h2>Sign in</h2>
                    <div className="modal-body">
                        <p>Sign in to save your sequences. We will only store your name and email.</p>
                        <GoogleLogin toggleAuth={this.props.toggleAuth} />
                    </div>
                </Modal>
            </div>

        )
    }
}

export default Login;

