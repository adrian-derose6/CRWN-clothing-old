import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useHover } from '../../utils/useHover.js';

import './nav-popover.styles.scss';

const BackgroundImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
    visibility: ${props => props.visible ? 'visible': 'hidden'};
`

const NavPopover = ({ label, image, link }) => {
    let [dropdown, isHovered] = useHover();

    return (
        <div className='nav-popover-container' ref={dropdown}>
            <Link className='nav-link' to={link}>{label}</Link>
            <div className={`${isHovered ? 'open' : 'closed'} nav-popover`}>
                <div className='links-container'>
                    <div className='links-list'>
                        
                    </div>
                </div>
                <div className='image-container'>
                    <BackgroundImage src={image} visible={isHovered}/>
                </div>
            </div>
        </div>
    )
}

export default NavPopover;

