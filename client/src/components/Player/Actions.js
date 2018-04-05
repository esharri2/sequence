import React, { Component } from 'react';

class Action extends Component {
    render() {
        return (
            <div className="action">
                <input>{this.props.action.title}</input>
            </div>
        )
    }
}

class Actions extends Component {
    render() {
        return <div className="actions">
            {this.props.actions.map((action, index) => <Action action={action} key={action + index} />)}
        </div>
    }
}


export default Actions;