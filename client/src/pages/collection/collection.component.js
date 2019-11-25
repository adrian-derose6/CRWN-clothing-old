import React, { createContext } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollection, selectFilters, selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import Spinner from '../../components/spinner/spinner.component';
import CollectionItem from '../../components/collection-item/collection-item.component';
import FilterBar from '../../components/filter-bar/filter-bar.component';
import SelectedFilters from '../../components/selected-filters/selected-filters.component';

import './collection.styles.scss';

class CollectionList extends React.Component {
    componentDidMount() {
        const { collection } = this.props;

        if (!collection) {
            this.fetchCollection();
        }
    }

    shouldComponentRender = () => {
        const { collection, isFetching } = this.props;

        if (!collection || isFetching) return false;

        return true;
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.filters, prevProps.filters)) {
            this.fetchCollection();
        }
    }

    fetchCollection = () => {
        const { fetchCollectionsStart, category, categoryId, filters } = this.props;
        const tagCode = category.tagCodes[0];
        const collectionName = category.CategoryValue;

        fetchCollectionsStart({ collectionName, tagCode, categoryId, filters });
    }

    render() {
        const { category, categoryId, collection, filters } = this.props;
        
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{categoryId} {category.CatName}</h2>
                <FilterBar 
                    facets={collection.facets} 
                    filters={collection.filters} 
                    categoryId={categoryId} 
                    collectionName={category.CategoryValue}
                />
                <SelectedFilters 
                    filters={collection.filters} 
                    categoryId={categoryId} 
                    collectionName={category.CategoryValue}
                />
                <div className='items'>
                    {
                        collection.results.map((item, index) => {
                            return (
                                <CollectionItem 
                                    item={item} 
                                    key={index}
                                />
                            )
                        })
                    }
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { category, categoryId } = ownProps;

    return ({
        collection: selectCollection(categoryId, category.CategoryValue)(state),
        filters: selectFilters(categoryId, category.CategoryValue)(state),
        isFetching: selectIsCollectionFetching(state)
    });
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: queryParams => dispatch(fetchCollectionsStart(queryParams)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList);