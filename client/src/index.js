import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import api from './utils/api.js'

class App extends Component {
    componentDidMount() {
        api.test().then(data => {
            console.log(data)
        })
    }

    render() {
        return <h1>Hello sdfasdf !</h1>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)