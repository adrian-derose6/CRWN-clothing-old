import React from 'react';
import { Link } from 'react-router-dom';

import './nav-breadcrumbs.styles.scss';

const NavBreadcrumbs = ({ topCategory, category, subcategory, itemName, style }) => {
    return (
        <div className='nav-breadcrumbs-container' style={style}>
            <ul>
                <li>
                    <Link to={`/`}>
                        <span>CRWN.com</span>
                    </Link>
                </li>
                { 
                    (topCategory) ? 
                        <li>
                            <Link to={`/${topCategory}`}>
                                <span>{topCategory}</span>
                            </Link>
                        </li>
                    : null
                }
                {
                    (subcategory) ? 
                        <li>
                            <Link to={`/${topCategory}/${category.CategoryValue}/${subcategory.CategoryValue}`}>
                                <span>{subcategory.CatName}</span>
                            </Link>
                        </li>
                    : null
                }
                {
                    (itemName) ? 
                        <li>
                            <span>{itemName}</span>
                        </li>
                    : null                       
                }
            </ul>
        </div>
    )
}

export default NavBreadcrumbs;

