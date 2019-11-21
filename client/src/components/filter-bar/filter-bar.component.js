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

const FilterBar = ({ facets }) => {
    if (!facets) return null;

    console.log(facets)

    return (
        <div className='filter-bar'>
            <div className='filter-tabs'>
              {
                Object.keys(facets).map((key, index) => {
                  const label = facets[key].name;
                  const list = facets[key].values
                  return <FilterDropdown 
                            label={label} 
                            key={index} 
                            list={list}
                          />
                })
              }
            </div>
        </div>
    );
}

export default FilterBar;