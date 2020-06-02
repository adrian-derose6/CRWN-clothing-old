import React from 'react';

import './nav-breadcrumbs.styles.scss';

const NavBreadcrumbs = () => {
    return (
        <div className='nav-breadcrumbs-container'>
            <ul>
                <li>
                    <span>CRWN</span>
                </li>
                <li>
                    <span>Shirts</span>
                </li>
                <li>
                    <span>T-Shirt</span>
                </li>
            </ul>
        </div>
    )
}

export default NavBreadcrumbs;

