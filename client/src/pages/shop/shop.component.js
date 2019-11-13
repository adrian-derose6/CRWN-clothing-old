import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { 
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import CategorySelection from '../../components/category-selection/category-selection.component';

import { selectCategoriesByGender} from '../../redux/shop/shop.selectors';
import { fetchCategoriesStart } from '../../redux/shop/shop.actions';

import './shop.styles.scss';

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

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCategoriesStart } = this.props;

        fetchCategoriesStart();
    }

    shouldComponentRender = () => {
        const { categories } = this.props;

        if (!categories) return false;

        return true;
    }

    render() {
        const { path, url } = this.props.match;
        const { categories } = this.props;

        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='shop-page'>
                <div className='left-panel'>
                    <CategorySelection categories={categories}/>
                </div>
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
    }
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