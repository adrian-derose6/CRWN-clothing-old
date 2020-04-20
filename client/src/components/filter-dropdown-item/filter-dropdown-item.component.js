import React, { useState } from 'react';
import { connect } from 'react-redux';

import checkmarkIcon from '../../assets/checkmark.png';

import './filter-dropdown-item.styles.scss';

const letterSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

const FilterDropdownItem = ({ label, number, type, item, selected }) => {
    const labelToDisplay = label.replace('-', ' ');
    let uppercase = letterSizes.includes(label) ? 'uppercase' : '';
    let checkboxColor = (type === 'colorWithNames') ? { backgroundColor: item.hexCode, border: 'none' } : { backgroundColor: 'none' };
    
    const handleClick = () => {

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

export default connect(null, null)(FilterDropdownItem);