import React, { Component } from 'react';
import Action from './Action';
import ScrollUp from './ScrollUp'
import api from '../../../utils/api'

class Actions extends Component {

    chime = null;

    componentDidMount() {
        api.chime().then(chime => {
            this.chime = chime.data;
        })
    }

    render() {

        let scrollUp;
        if (document.documentElement.offsetHeight > window.innerHeight + 40) {
            scrollUp = <ScrollUp />
        } else {
            scrollUp = null;
        }

        return (
            <div className="actions">
                {this.props.actions.map((action, index) =>
                    <Action
                        handleActionsChange={this.props.handleActionsChange}
                        changeActionIndex={this.props.changeActionIndex}
                        remove={this.props.remove}
                        updateIndex={this.props.updateIndex}
                        action={action}
                        actionIndex={index}
                        length={this.props.length}
                        currentIndex={this.props.currentIndex}
                        playing={this.props.playing}
                        paused={this.props.paused}
                        voiceConfig={this.props.voiceConfig}
                        key={index}
                        chime={this.chime}
                    />)}
                {scrollUp}
            </div>
        )
    }
}

export default Actions;