import React from 'react';
import { connect } from 'react-redux';

import deleteIcon from '../../assets/delete-white.png';

import { toggleFilter } from '../../redux/shop/shop.actions';

import './selected-filters.styles.scss';

const letterSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

const SelectedFilters = ({ filters, toggleFilter, categoryId, collectionName }) => {
    if (!filters || filters.length === 0) return null;

    const handleClick = (filter) => {
        toggleFilter({ item: filter, categoryId, collectionName });
    }

    return (
        <div className='selected-filters'>
            <span className='label'>Selected Filters:</span>
            {
                filters.map(filter => {
                    if (filter.facet === 'sortBy') return null;
                    
                    const nameClass = letterSizes.includes(filter.name)  ? 'uppercase' : 'capitalize';

                    return (
                        <div className='filter-box'>
                            <div className='inner-box'>
                                <span className={`${nameClass}`}>{filter.name}</span>
                            </div>
                            <div className='cancel-box inner-box' onClick={() => handleClick(filter)}>
                                <img src={deleteIcon} className='delete-icon'/>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleFilter: (filter) => dispatch(toggleFilter(filter))
});

export default connect(null, mapDispatchToProps)(SelectedFilters);