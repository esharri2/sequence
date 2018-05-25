import React from 'react';
import UserSequences from './UserSequences';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Clear from './Clear';

const Nav = props => {
    return (
        <nav>
            <div className="logo">Sequence</div>
            <ul>
                <Clear
                    clear={props.clear}
                    setSequence={props.setSequence}
                />
                {props.authenticated
                    ? <li> <UserSequences setSequence={props.setSequence} /> </li>
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

export default Nav;