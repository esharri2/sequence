import React, { Component } from 'react';
import api from '../../utils/api';
import Modal from 'react-modal';
import Loader from './Loader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class UserSequences extends Component {
    state = {
        //this should be null, show loader while null, then make empty array if person has no things
        sequences: null,
        modalIsOpen: false
    }

    componentWillMount() {
        Modal.setAppElement(document.getElementById('root'));
    }

    getSequences = () => {
        api.getSequences().then(res => {
            //TODO alphabetize
            //make empty array if nothing there
            const sequences = res.data.sequences ? res.data.sequences : [];
            this.setState({ sequences })
        })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    remove = event => {
        const id = event.currentTarget.dataset.id;
        api.delete(id).then(res => {
            const newSequences = this.state.sequences.filter(element => {
                return element._id !== id;
            })
            this.setState({ sequences: newSequences })
        })
    }

    render() {
        let body;

        if (!this.state.sequences) {
            body = <Loader />
        }

        else if (this.state.sequences.length > 0) {
            body = <div>{this.state.sequences.map(
                sequence =>
                    <div key={sequence._id}>
                        <div onClick={() => this.props.setSequence(sequence._id)}>{sequence.title}</div>
                        <button data-id={sequence._id} onClick={this.remove}>
                            <FontAwesomeIcon className="icon" icon={faTimes} />
                        </button>
                    </div>
            )}</div>
        } else {
            body = <p>You don't have any saved sequences. Create some and save them, and they will all show up here.</p>
        }


        return (
            <div>
                <button onClick={this.openModal}>Sequences</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.getSequences}
                    onRequestClose={this.closeModal}
                    contentLabel="Saved sequences"
                    className="modal-content"
                    overlayClassName="modal"
                >
                    <h2>Saved sequences</h2>
                    {body}
                </Modal>
            </div>
        )

    }
}

export default UserSequences;

