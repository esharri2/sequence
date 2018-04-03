import React, { Component } from 'react';

class Action extends Component {
    render() {
        return <h1>{this.props.action.title}</h1>
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