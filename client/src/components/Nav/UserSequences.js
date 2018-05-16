import React, { Component } from 'react';
import Modal from '../Modal';
import api from '../../utils/api';
import Modal from 'react-modal';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class UserSequences extends Component {
    state = {
        sequences: []
    }

    getSequences = () => {
        api.getSequences().then(res => {
            console.log(res)
            this.setState({ sequences: res.data.sequences })
        })
    }

    remove = event => {
        //remove api call using name below
        console.log(`I need to remove ${event.currentTarget.dataset.name}`);
    }

    render() {
        const sequenceList = this.state.sequences.map(
            sequence =>
                <div key={sequence._id}>
                    <div onClick={() => this.props.setSequence(sequence._id)}>{sequence.title}</div>
                    <button data-name={sequence} onClick={this.remove}>
                        <FontAwesomeIcon className="icon" icon={faTimes} />
                    </button>
                </div>
        )
        const body = <div>{sequenceList}</div>;

        return <Modal
            buttonText="Sequences"
            title="Saved sequences"
            body={body}
            onOpen={this.getSequences} />
    }
}

export default UserSequences;

