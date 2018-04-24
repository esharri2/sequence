import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class Modal extends Component {

    state = {
        isOpen: false
    }

    open = () => this.setState({ isOpen: true });
    close = () => this.setState({ isOpen: false })


    render() {
        return (
            <div className="modal-wrapper">
                <button onClick={this.open}>{this.props.buttonText}</button>
                {this.state.isOpen
                    ? <div onClick={this.close} className="modal">
                        <div className="modal-body">
                            <button className="close-modal">
                                <FontAwesomeIcon onClick={this.close} className="icon close-modal" icon={faTimes} />
                            </button>
                            <div className="modal-header">
                                {this.props.title}
                            </div>
                            <div className="modal-content">
                                {this.props.body}
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        )
    }

}

export default Modal;