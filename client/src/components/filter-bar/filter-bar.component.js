import React from 'react';

import FilterDropdown from '../filter-dropdown/filter-dropdown.component';

import './filter-bar.styles.scss';

const FilterBar = ({ facets, filters, categoryId, collectionName }) => {
    if (!facets) return null;
    return (
        <div className='filter-bar'>
            <div className='filter-tabs'>
              {
                Object.keys(facets).map((key, index) => {
                  const label = facets[key].name;
                  const list = facets[key].values
                  return <FilterDropdown 
                            filters={filters}
                            label={label} 
                            key={index} 
                            list={list}
                            facet={key}
                            categoryId={categoryId}
                            collectionName={collectionName}
                          />
                })
              }
            </div>
        </div>
    );
}

export default FilterBar;