import React, { Component } from 'react';
import Action from './Action';
import ScrollUp from './ScrollUp'
import api from '../../../utils/api'

class Actions extends Component {
    state = {
        showScrollUp: false
    }

    chime = null;

    componentDidMount() {
        api.chime().then(chime => {
            this.chime = chime.data;
        })
    }

    componentDidUpdate() {
        //Check doc height relative to window height to determine if "Back to top" needs to show
        const docHeight = document.documentElement.offsetHeight;
        const winHeight = window.innerHeight + 40;
        if (this.state.showScrollUp && docHeight < winHeight) {
            this.setState({ showScrollUp: false })
        } else if (!this.state.showScrollUp && docHeight > winHeight) {
            this.setState({ showScrollUp: true })
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
                        length={this.props.length}
                        currentIndex={this.props.currentIndex}
                        playing={this.props.playing}
                        paused={this.props.paused}
                        voiceConfig={this.props.voiceConfig}
                        chime={this.chime}
                        action={action}
                        actionIndex={index}                       
                        key={index}
                    />)}
                {this.state.showScrollUp ? <ScrollUp /> : null}
            </div>
        )
    }
}

export default Actions;