import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { 
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import CategorySelection from '../../components/category-selection/category-selection.component';

import { selectCategoriesByGender} from '../../redux/shop/shop.selectors';
import { fetchCategoriesStart } from '../../redux/shop/shop.actions';

import './shop.styles.scss';

const CollectionList = lazy(() => import('../collection/collection.component'));

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCategoriesStart, categories } = this.props;

        if (!categories) {
            fetchCategoriesStart();
        }
    }

    shouldComponentRender = () => {
        const { categories } = this.props;

        if (!categories) return false;

        return true;
    }

    render() {
        const { path, params } = this.props.match;
        const { categories } = this.props;

        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='shop-page'>  
                <Suspense fallback={<Spinner />}>          
                    <div className='left-panel'>
                        <CategorySelection categories={categories}/>
                    </div>
                    <Switch>
                        {
                            categories.map((category, index) => (
                                <Route exact key={index} path={`${path}/${category.CategoryValue}`}>
                                    <CollectionList category={category} categoryId={params.categoryId}/>
                                </Route>
                            ))
                        }
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