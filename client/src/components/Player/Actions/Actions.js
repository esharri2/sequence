import React, { Component } from 'react';
import Action from './Action';

class Actions extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.actions.length < this.props.actions.length) {
            //Scroll to newly added action
            const container = document.querySelector(".actions");
            const newActionTop = document.querySelector(".actions>*:last-child").offsetTop
            container.scrollTop = newActionTop;
        }
    }

    render() {
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
                        key={index} />)}
            </div>
        )
    }
}

export default Actions;