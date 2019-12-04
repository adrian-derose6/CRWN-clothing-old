import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CategorySelection from '../category-selection/category-selection.component';

import { selectCategoriesByGender } from '../../redux/shop/shop.selectors';
import { useHover } from '../../utils/useHover.js';

import './nav-popover.styles.scss';

const BackgroundImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
    visibility: ${props => props.visible ? 'visible': 'hidden'};
`

const NavPopover = ({ label, image, link, value, categories }) => {
    let [dropdown, isHovered] = useHover();
    
    return (
        <div className='nav-popover-container' ref={dropdown}>
            <Link className='nav-link' to={link}>{label}</Link>
            <div className={`${isHovered ? 'open' : 'closed'} arrow-up`} />
            <div className={`${isHovered ? 'open' : 'closed'} nav-popover`}>
                <div className='links-container'>
                    <CategorySelection categories={categories} large categoryId={value}/>
                    <CategorySelection categories={MOCK_LINKS} large label='Collections'/>
                </div>
                <div className='image-container'>
                    <BackgroundImage src={image} visible={isHovered}/>
                </div>
            </div>
        </div>
    )
}

const MOCK_LINKS = [
    {
        CatName: 'Gifts By Price',
    },
    {
        CatName: 'Gift Cards',
    },
    {
        CatName: 'In it. For Everyone'
    },
    {
        CatName: 'Online Exclusives'
    },
    {
        CatName: '"Best Of" Sale'
    },
    {
        CatName: 'Clearance'
    }
];

const mapStateToProps = (state, ownProps) => ({
    categories: state.shop.categories[ownProps.value]
});

export default connect(
    mapStateToProps
)(NavPopover);

