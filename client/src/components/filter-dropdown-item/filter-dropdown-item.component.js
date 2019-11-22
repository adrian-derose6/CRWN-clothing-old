import React from 'react';

import './filter-dropdown-item.styles.scss';

const letterSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

const FilterDropdownItem = ({ label, number, type, item }) => {
    const labelToDisplay = label.replace('-', ' ');
    let uppercase = letterSizes.includes(label) ? 'uppercase' : '';
    let checkboxStyle = (type === 'colorWithNames') ? { backgroundColor: item.hexCode, border: 'none' } : { backgroundColor: 'none' };

    return (
        <div className='dropdown-item'>
            <div className='label-container'>
                <div className='checkbox' style={checkboxStyle}></div>
                <span className={`${uppercase} label-text`}>{labelToDisplay}</span>
            </div>
            <span>{number}</span>
        </div>
    )
}

export default FilterDropdownItem;