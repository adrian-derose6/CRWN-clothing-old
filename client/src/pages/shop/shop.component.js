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

const ShopPage = () => {
    const { url, path } = useRouteMatch();

    return (
        <div className='shop-page'>
            <ul>
                <li>
                    <Link to={`${url}/hat`}>Hat</Link>
                </li>
                <li>
                    <Link to={`${url}/jacket`}>Jacket</Link>
                </li>
                <li>
                    <Link to={`${url}/jeans`}>Jeans</Link>
                </li>
                <li>
                    <Link to={`${url}/jeans/skinny-jeans`}>Skinny Jeans</Link>
                </li>
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