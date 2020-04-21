import React, { useState } from 'react';
import { connect } from 'react-redux';

import checkmarkIcon from '../../assets/checkmark.png';

import { toggleFilter } from '../../redux/shop/shop.actions';

import './filter-dropdown-item.styles.scss';

const letterSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

const FilterDropdownItem = ({ label, number, type, item, toggleFilter, selected, categoryId, collectionName }) => {
    const labelToDisplay = label.replace('-', ' ');
    let uppercase = letterSizes.includes(label) ? 'uppercase' : '';
    let checkboxColor = (type === 'colorWithNames') ? { backgroundColor: item.hexCode, border: 'none' } : { backgroundColor: 'none' };
    
    const handleClick = () => {
        toggleFilter({ item, categoryId, collectionName });
    }

    return (
        <div className='dropdown-item' onClick={handleClick}>
            <div className='label-container'>
                <div className='checkbox' style={checkboxColor}>
                    {
                        (selected) ? <img src={checkmarkIcon} className='checkmark' /> : null
                    }
                </div>
                <span className={`${uppercase} label-text`}>{labelToDisplay}</span>
            </div>
            <span>{item.count}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleFilter: (params) => dispatch(toggleFilter(params))
})

export default connect(null, mapDispatchToProps)(FilterDropdownItem);