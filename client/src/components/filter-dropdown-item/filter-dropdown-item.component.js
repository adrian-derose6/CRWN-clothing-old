import React from 'react';

import './filter-dropdown-item.styles.scss';

const FilterDropdownItem = ({ label, number }) => {
    return (
        <div className='dropdown-item'>
            <div className='label'>
                <div className='checkbox'></div>
                <span>{label}</span>
            </div>
            <span>{number}</span>
        </div>
    )
}

export default FilterDropdownItem;