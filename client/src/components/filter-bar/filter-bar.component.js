import React from 'react';

import expandIcon from '../../assets/expand-arrow.png';
import collapseIcon from '../../assets/collapse-arrow.png';

import './filter-bar.styles.scss';

const FilterBar = (props) => {
    return (
        <div className='filter-bar'>
            <div className='filter-tabs'>
                <button className='filter-tab'>
                    <span className='label'>Sort By</span>
                    <img className='arrow' src={expandIcon} />
                </button>
                <button className='filter-tab'>
                    <span className='label'>Quality</span>
                    <img className='arrow' src={expandIcon} />
                </button>
                <button className='filter-tab'>
                    <span className='label'>Color</span>
                    <img className='arrow' src={expandIcon} />
                </button>
                <button className='filter-tab'>
                    <span className='label'>Size</span>
                    <img className='arrow' src={expandIcon} />
                </button>
                <button className='filter-tab'>
                    <span className='label'>Fit</span>
                    <img className='arrow' src={expandIcon} />
                </button>
            </div>
        </div>
    );
}

export default FilterBar;