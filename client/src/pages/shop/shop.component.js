import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesByGender } from '../../redux/shop/shop.selectors';
import { fetchCategoriesStart } from '../../redux/shop/shop.actions';

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

const ShopPage = ({ fetchCategoriesStart, categories }) => {
    const { url, path } = useRouteMatch();
    const { categoryId } = useParams();
    const links = (categoryId === 'guys') ? guysLinks : girlsLinks;
    
    useEffect(() => {
        fetchCategoriesStart();
    }, []);

    console.log(categories)

    return (
        <div className='shop-page'>
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

const mapStateToProps = (state, ownProps) => ({
    categories: selectCategoriesByGender(ownProps.match.params.categoryId)(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ShopPage);