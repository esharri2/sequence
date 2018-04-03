import React, { Component } from 'react';
import Title from './Title';
import Controls from './Controls';
import Actions from './Actions';


class Player extends Component {

    render() {
        return (
            <div className="player">
                <Title title={this.props.sequence.title} />
                <Controls />
                <Actions actions={this.props.sequence.actions} />
            </div>
        )
    }
}

export default Player;