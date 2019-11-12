import React, { lazy, Suspense } from 'react';
import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';

import './shop.styles.scss';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPage = lazy(() => import('../collection/collection.component'));

const guysLinks = [
    { toUrl: 'hat', name: 'Hats' },
    { toUrl: 'jacket', name: 'Jackets' },
    { toUrl: 'jeans/skinny-jeans', name: 'Skinny Jeans'}
];

const girlsLinks = [
    { toUrl: 'dresses', name: 'Dresses' },
    { toUrl: 'bags', name: 'Bags' },
    { toUrl: 'skirts', name: 'Skirts' },
    { toUrl: 'jeans', name: 'Jeans' },
    { toUrl: 'jeans/skinny-jeans', name: 'Skinny Jeans' }
];

const ShopPage = () => {
    const { url, path } = useRouteMatch();
    const { categoryId } = useParams();
    const links = (categoryId === 'guys') ? guysLinks : girlsLinks;
    return (
        <div className='shop-page'>
            <ul>
               {
                   links.map(link => {
                       return <li><Link to={`${url}/${link.toUrl}`}>{link.name}</Link></li>;
                   })
               }
            </ul>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route exact path={path}>
                        <CollectionPage />
                    </Route>
                    <Route exact path={`${path}/:collectionId`}>
                        <CollectionPage />
                    </Route>
                    <Route exact path={`${path}/:collectionId/:subcollectionId`}>
                        <CollectionPage />
                    </Route>
                </Switch>
            </Suspense>
        </div>
    );
};

export default ShopPage;