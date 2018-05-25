import React, { Component } from 'react';
import api from '../../utils/api';
import Modal from 'react-modal';
import Loader from './Loader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrashAlt';


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
            //sort sequences alphabetically
            const copy = this.state.sequences.slice(0);
            const sortedSequences = copy.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            })
            
            body = <div className="sequence-list">{sortedSequences.map(
                sequence =>
                    <div className="modal-body" key={sequence._id}>
                        <p onClick={() => {
                            this.closeModal();
                            this.props.setSequence(sequence._id);
                        }}>
                            {sequence.title}
                        </p>
                        <button className="del-sequence" data-id={sequence._id} onClick={this.remove}>
                            <FontAwesomeIcon className="icon" icon={faTrash} />
                        </button>
                    </div>
            )}</div>
        } else {
            body = <p>You don't have any saved sequences. Create some and save them, and they will all show up here.</p>
        }


        return (
            <div >
                <button onClick={this.openModal}>Sequences</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.getSequences}
                    onRequestClose={this.closeModal}
                    contentLabel="Saved sequences"
                    className="modal-content"
                    overlayClassName="modal"
                >
                    <button className="close-modal" onClick={this.closeModal} >
                        <FontAwesomeIcon className="icon close-modal" icon={faTimes} />
                    </button>
                    <h2>Saved sequences</h2>
                    {body}
                </Modal>
            </div>
        )

    }
}

export default UserSequences;

