import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useHover } from '../../utils/useHover.js';

import './right-popover.styles.scss';

const RightPopover = ({icon, children, ...otherProps }) => {
    let [dropdown, isHovered] = useHover();

    return (
        <div className='right-popover-container' ref={dropdown}>
            <Link className='nav-link' to='/'>{icon}</Link>
            <div className={`${isHovered ? 'open' : 'closed'} arrow-up`} />
            <div className={`${isHovered ? 'open' : 'closed'} popover-wrapper`}> 
                <div className={`${isHovered ? 'open' : 'closed'} right-popover`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default RightPopover;