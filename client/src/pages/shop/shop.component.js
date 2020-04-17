import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { 
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import LinkList from '../../components/link-list/link-list.component';

import { selectCategoriesByValue } from '../../redux/shop/shop.selectors';
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
        console.log(categories);
        console.log(path)
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='shop-page'>  
                <Suspense fallback={<Spinner />}>          
                    <div className='left-panel'>
                        {categories.map((item, index) => {
                            if (Object.keys(item).includes('CategoriesArray')) {
                                return <LinkList 
                                            label={item.CatName} 
                                            value={item.CategoryValue} 
                                            list={item.CategoriesArray}
                                            match={this.props.match} 
                                            key={index}
                                        />
                            }
                        })}
                    </div>
                    {/*<Switch>
                        {
                            categories.map((category, index) => (
                                <Route exact key={index} path={`${path}/${category.CategoryValue}`}>
                                    <CollectionList category={category} categoryId={params.categoryId}/>
                                </Route>
                            ))
                        }
                    </Switch>*/}
                </Suspense>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    categories: selectCategoriesByValue(ownProps.match.params.categoryId)(state)
});

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ShopPage);