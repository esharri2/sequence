import React, { Component } from 'react';

import Play from './Play';
import Save from './Save';
import Stop from './Stop';
import Add from './Add';


class Controls extends Component {
    render() {
        const { play, pause, paused, playing, stop, authenticated, save, unsaved, add } = this.props

        return (
            <div className="controls">
                <div className="main">
                    <Play play={play} pause={pause} paused={paused} playing={playing} />
                    <Stop stop={stop} playing={playing} />
                    {authenticated ? <Save save={save} unsaved={unsaved} /> : null}
                </div>
                <div className="sub">
                    <Add add={add} />
                </div>
            </div>
        )
    }
}


export default Controls;