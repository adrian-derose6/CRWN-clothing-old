import React from 'react';

import FilterDropdown from '../filter-dropdown/filter-dropdown.component';

import './filter-bar.styles.scss';

const LIST = [
    {
        id: 0,
        title: 'New York',
        selected: false,
        key: 'location'
    },
    {
      id: 1,
      title: 'Dublin',
      selected: false,
      key: 'location'
    },
    {
      id: 2,
      title: 'California',
      selected: false,
      key: 'location'
    },
    {
      id: 3,
      title: 'Istanbul',
      selected: false,
      key: 'location'
    },
    {
      id: 4,
      title: 'Izmir',
      selected: false,
      key: 'location'
    },
    {
      id: 5,
      title: 'Oslo',
      selected: false,
      key: 'location'
    }
]

const FilterBar = (props) => {
    return (
        <div className='filter-bar'>
            <div className='filter-tabs'>
                <FilterDropdown label={'Sort By'} list={LIST}/>
                <FilterDropdown label={'Quality'} list={LIST}/>
                <FilterDropdown label={'Color'} list={LIST}/>
                <FilterDropdown label={'Size'} list={LIST}/>
                <FilterDropdown label={'Fit'} list={LIST}/>
            </div>
        </div>
    );
}

export default FilterBar;