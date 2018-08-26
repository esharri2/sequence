import React, { Component } from 'react';
import api from '../../utils/api';
import Modal from 'react-modal';
import Loader from './Loader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class UserSequences extends Component {
    state = {
        sequences: null,
        modalIsOpen: false
    }

    componentWillMount() {
        Modal.setAppElement(document.getElementById('root'));
    }

    getSequences = () => {
        api.getSequences().then(res => {
            console.log(res.data.sequences)
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
            if (id === this.props.sequenceId) {
                this.props.setSequence(null);
            }
            this.setState({ sequences: newSequences });
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

            //Create array of just titles and total time
            const sequenceList = sortedSequences.map(sequence => {
                let time = 0;
                sequence.actions.forEach(action => {
                    time += action.duration;
                });
                let minutes = ("0" + Math.floor(time / 60)).slice(-2);
                let seconds = ("0" + time % 60).slice(-2);
                sequence.duration = ` (${minutes}:${seconds})`
            })


            body = <div className="sequence-list">
                {sortedSequences.map(
                    sequence => {
                        //Highlight current sequence
                        let current = false;
                        if (sequence._id === this.props.sequenceId) {
                            current = true;
                        }
                        return <div className={`modal-body ${current ? 'current' : null}`} key={sequence._id}>
                            <p onClick={() => {
                                this.closeModal();
                                this.props.setSequence(sequence._id);
                            }}>
                                {sequence.title}
                                {sequence.duration}
                            </p>
                            <button className="del-sequence" data-id={sequence._id} onClick={this.remove}>
                                <FontAwesomeIcon className="icon" icon="trash-alt" />
                            </button>
                        </div>
                    }
                )}
            </div>
        } else {
            body = <p>You don't have any saved sequences. Create some and save them, and they will all show up here.</p>
        }


        return (
            <div >
                <button onClick={this.openModal}>Saved</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.getSequences}
                    onRequestClose={this.closeModal}
                    contentLabel="Saved sequences"
                    className="modal-content"
                    overlayClassName="modal"
                >
                    <button className="close-modal" onClick={this.closeModal} >
                        <FontAwesomeIcon className="icon close-modal" icon="times" />
                    </button>
                    <h2>Saved sequences</h2>
                    {body}
                    {/* <h2>Samples sequences</h2> */}
                </Modal>
            </div>
        )

    }
}

export default UserSequences;

