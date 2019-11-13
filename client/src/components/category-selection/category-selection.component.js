import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './category-selection.styles.scss';

const CategorySelection = ({ categories, match, history }) => {
    const { url } = match;
    console.log(history);
    return (
        <div className='category-selection'>
            <span className='label'>Shop By Product</span>
            {
                categories.map((category, index) => (
                    <Link 
                        style={{ marginBottom: 16 }} 
                        key={index}
                        to={`${url}/${category.CategoryValue}`}
                    >
                        <span className='category'>
                            {category.CatName}
                        </span>
                    </Link>
                ))
            }
        </div>
    );
};

export default withRouter(CategorySelection);