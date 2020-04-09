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
    state = {
        imageType: 'model',
        imageSize: 'small'
    };

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
        if (!equal(this.props.filters, prevProps.filters) && prevProps.filters !== null) {
            this.fetchCollection();
        }
    }

    fetchCollection = () => {
        const { fetchCollectionsStart, category, categoryId, filters } = this.props;
        const tagCode = category.tagCodes[0];
        const collectionName = category.CategoryValue;

        fetchCollectionsStart({ collectionName, tagCode, categoryId, filters });
    }

    setImageSize = (imageSize) => {
        if (this.state.imageSize !== imageSize) {
            this.setState({ imageSize });
        }
    }

    setImageType = (imageType) => {
        if (this.state.imageType !== imageType) {
            this.setState({ imageType });
        }
    }

    render() {
        const { imageSize, imageType } = this.state;
        const { category, categoryId, collection, filters } = this.props;
        const { CategoryValue, CatName } = category;
        const displayName = (CategoryValue === 'all-guys' || CategoryValue === 'all-girls') ? CatName : `${categoryId} ${CatName}`;
        
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{displayName}</h2>
                {(category.description) ? <span className='description'>{category.description}</span> : null}
                <FilterBar 
                    facets={collection.facets} 
                    filters={collection.filters} 
                    categoryId={categoryId} 
                    collectionName={category.CategoryValue}
                    setImageSize={(imageSize) => this.setImageSize(imageSize)}
                    setImageType={(imageType) => this.setImageType(imageType)}
                    imageType={imageType}
                    imageSize={imageSize}
                    numberOfItems={collection.pagination.totalNumberOfResults}
                />
                <SelectedFilters 
                    filters={collection.filters} 
                    categoryId={categoryId} 
                    collectionName={category.CategoryValue}
                />
                <div className={`${imageSize === 'large' ? 'large-items' : ''} items`}>
                    {
                        collection.results.map((item, index) => {
                            return (

                                    <CollectionItem 
                                        item={item} 
                                        key={index}
                                        imageType={imageType}
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