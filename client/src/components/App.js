import React, { Component } from 'react';
import Splash from './Splash'
import Player from './Player';
import Nav from './Nav';
import api from '../utils/api'

class App extends Component {
    state = {
        showSplash: false,
        authenticated: false,
        sequenceId: null,
        title: "",
        actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }],
        unsaved: false,
    }

    componentDidMount() {
        //sign in check!!!! are you signed in?
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sequenceId !== this.state.sequenceId) {
            //User has cleared a saved sequence
            if (!this.state.sequenceId) {
                this.setState({ title: "", actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }] })
            }
            //User has saved or loaded a sequence
            else {
                api.getSequence(this.state.sequenceId).then(sequence => {
                    const { title, actions } = sequence.data;
                    this.setState({ title, actions, unsaved: false });
                })
            }
        }
    }

    enter = () => {
        this.setState({ showSplash: false })
    }

    toggleAuth = () => {
        this.state.authenticated
            ? this.setState({ authenticated: false })
            : this.setState({ authenticated: true })
    }

    clear = () => {
        //TODO - might need to clear id and stuff too?~~~
        this.setState({ title: "", actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }] })
    }

    save = () => {
        const sequence = {
            //TODO there might not be a title for a new thing at this point? check.
            title: this.state.title,
            actions: this.state.actions
        }
        if (this.props.sequenceId) {
            console.log("update!")
            api.update(this.state.sequenceId, sequence).then(() => this.setState({ unsaved: false }))
        } else {
            //TODO don't need user ID were derp is
            api.save("derp", sequence).then(res => {
                this.setSequence(res.data.id)
            })
        }
    }

    add = () => {
        this.setState({ actions: [...this.state.actions, { title: "", duration: 30 }] });
    }

    remove = (index) => {
        const newArray = [...this.state.actions];
        newArray.splice(index, 1);
        this.setState({ actions: newArray });
    }

    //Change the index of an action in the actions array
    changeActionIndex = (oldIndex, newIndex) => {
        const newActions = [...this.state.actions];
        newActions.splice(newIndex, 0, newActions.splice(oldIndex, 1)[0]);
        this.setState({ actions: newActions, unsaved: true })
    }

    //Handle changes to sequence details
    handleSequenceChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value, unsaved: true });
    }

    //Handle changes to name, minutes, and seconds of actions
    handleActionsChange = event => {
        let { name, value, dataset } = event.target;
        const newActions = this.state.actions.map((action, index) => {
            if (index === parseInt(dataset.index)) {
                const minutes = Math.floor(action.duration / 60);
                const seconds = Math.floor(action.duration % 60);
                if (name === "seconds") {
                    if (!value) {
                        value = 0;
                    }
                    name = "duration";
                    value = (minutes * 60) + parseInt(value);
                } else if (name === "minutes") {
                    if (!value) {
                        value = 0;
                    }
                    name = "duration";
                    value = seconds + parseInt(value) * 60;

                }
                action[name] = value;
            }
            return action
        });
        this.setState({ actions: newActions, unsaved: true });
    }

    setSequence = (sequenceId) => {
        this.setState({ sequenceId })
    }

    render() {
        const components = this.state.showSplash
            ? <div id="root" className="app"><Splash enter={this.enter} /></div>
            : <div id="root" className="app">
                <Nav
                    authenticated={this.state.authenticated}
                    toggleAuth={this.toggleAuth}
                    setSequence={this.setSequence}
                    clear={this.clear}
                />
                <Player
                    title={this.state.title}
                    actions={this.state.actions}
                    clear={this.clear}
                    unsaved={this.state.unsaved}
                    authenticated={this.state.authenticated}
                    sequenceId={this.state.sequenceId}
                    setSequence={this.setSequence}
                    handleSequenceChange={this.handleSequenceChange}
                    handleActionsChange={this.handleActionsChange}
                    changeActionIndex={this.changeActionIndex}
                    add={this.add}
                    save={this.save}
                    remove={this.remove} />
            </div>;
        return components
    }
}

export default App;