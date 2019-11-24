import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollection, selectFilters } from '../../redux/shop/shop.selectors';

import Spinner from '../../components/spinner/spinner.component';
import CollectionItem from '../../components/collection-item/collection-item.component';
import FilterBar from '../../components/filter-bar/filter-bar.component';
import SelectedFilters from '../../components/selected-filters/selected-filters.component';

import './collection.styles.scss';

class CollectionList extends React.Component {
    componentDidMount() {
        const { collection, categoryId, category } = this.props;

        if (!collection) {
            this.fetchCollection();
        }
    }

    shouldComponentRender = () => {
        const { collection } = this.props;

        if (!collection) return false;

        return true;
    }

    fetchCollection = () => {
        const { fetchCollectionsStart, category, collection, categoryId, filters } = this.props;
        const tagCode = category.tagCodes[0];
        const collectionName = category.CategoryValue;

        fetchCollectionsStart({ collectionName, tagCode, categoryId });
    }

    render() {
        const { category, categoryId, collection } = this.props;
        const { filters } = collection;
        
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{categoryId} {category.CatName}</h2>
                <FilterBar facets={collection.facets} filters={filters}/>
                <SelectedFilters filters={filters} />
                <div className='items'>
                    {
                        collection.results.map((item, index) => {
                            return (
                                <CollectionItem item={item} key={index}/>
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
    });
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: queryParams => dispatch(fetchCollectionsStart(queryParams)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList);