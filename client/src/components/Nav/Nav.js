import React from 'react';
import UserSequences from './UserSequences';
import About from './About';
import Login from './Login';
import Logout from './Logout';

const Nav = props => {
    return (
        <nav>
            <div className="logo">Sequence</div>
            <ul>
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