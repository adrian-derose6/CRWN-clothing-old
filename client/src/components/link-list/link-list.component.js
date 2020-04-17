import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './link-list.styles.scss';

const LinkList = ({ list, match, label, value }) => {
    const { url, params } = match;
    return (
        <div className='link-selection'>
            <span className='label'>{label}</span>
            {
                list.map((item, index) => {
                    console.log(item)
                    console.log(url)
                    const urlToLinkTo = `${url + '/'}${value || ''}/${item.CategoryValue}`
                    return (
                        <Link
                            key={index}
                            to={urlToLinkTo}
                            style={{marginBottom: 12}}
                        >
                            <span className='link'>
                                {item.CatName}
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default withRouter(LinkList);