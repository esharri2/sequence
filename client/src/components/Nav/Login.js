import React, { Component } from 'react';
import Modal from 'react-modal';
import GoogleLogin from './GoogleLogin';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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
                        <FontAwesomeIcon className="icon close-modal" icon="times" />
                    </button>
                    <h2>Sign in</h2>
                    <div className="modal-body">
                        <p>Sign in to save your sequences. We won't save any of your personal information.</p>
                        <GoogleLogin toggleAuth={this.props.toggleAuth} />
                    </div>
                </Modal>
            </div>

        )
    }
}

export default Login;

