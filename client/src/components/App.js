import React, { Component } from 'react';
import Splash from './Splash'
import Player from './Player';
import Menu from './Menu';
import api from '../utils/api';

import fontawesome from '@fortawesome/fontawesome'
import times from '@fortawesome/fontawesome-free-solid/faTimes';
import angleup from '@fortawesome/fontawesome-free-solid/faAngleUp';
import angledown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import trash from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import play from '@fortawesome/fontawesome-free-solid/faPlay';
import pause from '@fortawesome/fontawesome-free-solid/faPause';
import save from '@fortawesome/fontawesome-free-solid/faSave';

fontawesome.library.add(times, angleup, angledown, trash, play, pause, save);

class App extends Component {

    defaultSequence = [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }];

    state = {
        showSplash: true,
        authenticated: null,
        sequenceId: null,
        title: "",
        actions: this.defaultSequence,
        unsaved: false,
        windowHeight: 0
    }

    componentDidMount() {
        // api.authcheck().then(res => {
        //     res.data.authenticated
        //         ? this.setState({ authenticated: true })
        //         : this.setState({ authenticated: false })
        // })
        this.setState({windowHeight:window.innerHeight})


    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sequenceId !== this.state.sequenceId) {
            //User has cleared a saved sequence
            if (!this.state.sequenceId) {
                this.setState({ title: "", actions: this.defaultSequence })
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
        this.setState({ title: "", actions: [{ title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }, { title: "", duration: 30 }] })
    }

    save = () => {
        const { sequenceId, title, actions } = this.state;
        const sequence = { title, actions };
        if (this.state.sequenceId) {
            api.update(sequenceId, sequence).then(() => this.setState({ unsaved: false }))
        } else {
            api.save(sequence).then(res => {
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
                    !value ? value = 0 : null;
                    name = "duration";
                    value = (minutes * 60) + parseInt(value);
                } else if (name === "minutes") {
                    !value ? value = 0 : null;
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

        const divStyle = {
            height:this.state.windowHeight
          };

        let components;

        if (this.state.showSplash && !this.state.authenticated) {
            components =
                <div id="root" className="app">
                    <Splash
                        enter={this.enter}
                        authenticated={this.state.authenticated} />
                </div>
        } else {
            components =
                <div id="root" style={divStyle} className="app">
                    <Menu
                        authenticated={this.state.authenticated}
                        sequenceId={this.state.sequenceId}
                        toggleAuth={this.toggleAuth}
                        setSequence={this.setSequence}
                        clear={this.clear}
                    />
                    <Player
                        title={this.state.title}
                        actions={this.state.actions}
                        unsaved={this.state.unsaved}
                        authenticated={this.state.authenticated}
                        sequenceId={this.state.sequenceId}
                        setSequence={this.setSequence}
                        handleSequenceChange={this.handleSequenceChange}
                        handleActionsChange={this.handleActionsChange}
                        changeActionIndex={this.changeActionIndex}
                        add={this.add}
                        save={this.save}
                        remove={this.remove}
                        clear={this.clear}
                    />
                </div>
        }
        return components
    }
}

export default App;