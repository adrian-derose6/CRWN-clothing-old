import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleFilter } from '../../redux/shop/shop.actions';

import './filter-dropdown-item.styles.scss';

const letterSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

const FilterDropdownItem = ({ label, number, type, item, toggleFilter, filters }) => {
    const labelToDisplay = label.replace('-', ' ');
    let uppercase = letterSizes.includes(label) ? 'uppercase' : '';
    let checkboxStyle = (type === 'colorWithNames') ? { backgroundColor: item.hexCode, border: 'none' } : { backgroundColor: 'none' };

    const handleClick = () => {
        toggleFilter(item);
    }

    return (
        <div className='dropdown-item' onClick={handleClick}>
            <div className='label-container'>
                <div className='checkbox' style={checkboxStyle}></div>
                <span className={`${uppercase} label-text`}>{labelToDisplay}</span>
            </div>
            <span>{number}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    filters: state.shop.filters
});

const mapDispatchToProps = dispatch => ({
    toggleFilter: (item) => dispatch(toggleFilter(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdownItem);