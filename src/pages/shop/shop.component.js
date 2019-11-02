import React from 'react';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component.js';

import './shop.styles.scss';

const ShopPage = ({ collections }) => {
    return (
        <div className='shop-page'>
            <CollectionsOverview />
        </div>
    )
};

export default ShopPage;