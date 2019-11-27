import React from 'react';

import FilterDropdown from '../filter-dropdown/filter-dropdown.component';
import SmallIcon from './small-icon.component';

import './filter-bar.styles.scss';

const FilterBar = ({ 
  facets, 
  filters, 
  categoryId, 
  collectionName, 
  setImageSize, 
  setImageType, 
  imageType, 
  imageSize,
  numberOfItems
}) => {
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
            <div className='format-tabs'>
              <span>{numberOfItems} Items</span>
              <div 
                className={`${imageType === 'model' ? 'selected' : ''} image-select-button`}
                onClick={() => setImageType('model')}
              >
                <span>Model</span>
              </div>
              <div 
                className={`${imageType === 'product' ? 'selected' : ''} image-select-button`}
                onClick={() => setImageType('product')}
              >
                <span>Product</span>
              </div>
              <SmallIcon 
                large 
                selected={imageSize === 'large'}
                onClick={() => setImageSize('large')}
              />
              <SmallIcon 
                selected={imageSize === 'small'}
                onClick={() => setImageSize('small')}
              />
            </div>
        </div>
    );
}

export default FilterBar;