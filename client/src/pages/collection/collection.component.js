import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollection, selectCollectionFacets } from '../../redux/shop/shop.selectors';

import Spinner from '../../components/spinner/spinner.component';
import CollectionItem from '../../components/collection-item/collection-item.component';
import FilterBar from '../../components/filter-bar/filter-bar.component';

import './collection.styles.scss';

class CollectionList extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStart, category, collection, categoryId } = this.props;
        const tagCode = category.tagCodes[0];
        const collectionName = category.CategoryValue;

        if (!collection) {
            fetchCollectionsStart({ collectionName, tagCode, categoryId });
        }
    }

    shouldComponentRender = () => {
        const { collection } = this.props;

        if (!collection) return false;

        return true;
    }

    render() {
        const { category, categoryId, collection } = this.props;
        console.log(collection)

        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{categoryId} {category.CatName}</h2>
                <FilterBar facets={collection.facets} />
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
        collection: selectCollection(categoryId, category.CategoryValue)(state)
    });
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: queryParams => dispatch(fetchCollectionsStart(queryParams)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList);