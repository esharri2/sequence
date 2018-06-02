import React from 'react';
import UserSequences from './UserSequences';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Clear from './Clear';

const Menu = props => {
    return (
        <nav>
            <div className="logo">Sequence</div>
            <ul>
                <li>
                    <Clear
                        clear={props.clear}
                        setSequence={props.setSequence}
                    />
                </li>
                {props.authenticated
                    ? <li> <UserSequences
                        setSequence={props.setSequence}
                        sequenceId={props.sequenceId}
                    /> </li>
                    : null}
                <li> <About /> </li>
                {props.authenticated
                    ? <li> <Logout toggleAuth={props.toggleAuth} /></li>
                    : <li><Login toggleAuth={props.toggleAuth} />   </li>
                }
            </ul>
        </nav>
    )
}

export default Menu;