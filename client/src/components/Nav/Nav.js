import React from 'react';
import UserSequences from './UserSequences';
import Help from './Help';
import Login from './Login';

const Nav = () => {
    return (
        <nav>
            <div className="logo">Sequence</div>
            <ul>
                <li> <UserSequences /> </li>
                <li> <Help /> </li>
                <li> <Login /></li>

            </ul>
        </nav>
    )
}

export default Nav;