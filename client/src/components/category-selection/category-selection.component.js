import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './category-selection.styles.scss';

const CategorySelection = ({ categories, match, history, location, large, label, categoryId}) => {
    const { url } = match;
    return (
        <div className='category-selection'>
            <span className={`${large ? 'large-label' : '' } label`}>{label || 'Shop By Category'}</span>
            {
                categories.map((category, index) => {
                    const urlToLinkTo = `${url === '/' ? url : url + '/'}${categoryId ? categoryId + '/' : ''}${category.CategoryValue || ''}`
                    
                    return (
                        <Link 
                            style={{ marginBottom: (large) ? 22 : 16 }} 
                            key={index}
                            to={urlToLinkTo}
                        >
                            <span className={`${large ? 'large-category' : ''} category`}>
                                {category.CatName}
                            </span>
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default withRouter(CategorySelection);