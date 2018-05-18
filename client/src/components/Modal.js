import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class Modal extends Component {
//elevate state to parents
    state = {
        isOpen: false
    }

    open = () => this.setState({ isOpen: true });
    close = event => {
        if (event.target.classList.contains('modal')) {
            this.setState({ isOpen: false })
        }
    }

    render() {
        return (
            <div className="modal-wrapper">
                <button onClick={this.open}>{this.props.buttonText}</button>
                {this.state.isOpen
                    ? <div onClick={this.close} className="modal">
                        <div className="modal-body">
                           
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