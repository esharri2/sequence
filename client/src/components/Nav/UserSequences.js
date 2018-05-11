import React, { Component } from 'react';
import Modal from '../Modal';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class UserSequences extends Component {
    state = {
        sequences: []
    }

    remove = event => {
        //remove api call using name below
        console.log(`I need to remove ${event.currentTarget.dataset.name}`);       
    }

    componentDidMount() {
        //fetch users sequences from db
        this.setState({
            sequences: [
                "Morning Yoga",
                "Arm workout",
                "Hip stretch sequence"
            ]
        })
    }

    render() {
        const sequenceList = this.state.sequences.map(
            sequence =>
                <div key={sequence}>
                    <div>{sequence}</div>
                    <button data-name={sequence} onClick={this.remove}>
                        <FontAwesomeIcon className="icon" icon={faTimes} />
                    </button>
                </div>
        )
        const body = <div>{sequenceList}</div>;

        return <Modal
            buttonText="Sequences"
            title="Saved sequences"
            body={body} />
    }
}

export default UserSequences;

