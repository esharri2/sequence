import React, { Component } from 'react';
import Action from './Action';
import api from '../../../utils/api'

class Actions extends Component {

    constructor(props) {
        super(props);
        this.chime = null;
    }

    componentDidMount() {
        api.chime().then(chime => {
            this.chime = chime.data;
            // console.log(this.chime)     
        })
    }

    componentDidUpdate(prevProps) {
        console.log("__________________________________")
        console.log(this.props)
        console.log("__________________________________")
        
        if (prevProps.actions.length < this.props.actions.length && prevProps.sequenceId === this.props.sequenceId) {
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
                        key={index}
                        chime={this.chime}
                        />)}
            </div>
        )
    }
}

export default Actions;