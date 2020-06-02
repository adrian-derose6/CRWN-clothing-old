import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import equal from 'fast-deep-equal';

import { fetchProductsListStart } from '../../redux/shop/shop.actions';
import { 
    selectProductsListByCollection, 
    selectFacetsByCollection,
    selectPaginationByCollection,
    selectIsCollectionFetching 
} from '../../redux/shop/shop.selectors';

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
        const { subcategory } = this.props;
        const tagCode = subcategory.tagCodes[0];

        this.fetchProductsList({ tagCode });
    }

    componentDidUpdate(prevProps) {
        const { facets, subcategory } = this.props;
        const tagCode = subcategory.tagCodes[0];
        const prevFacets = prevProps.facets;

        if (prevFacets !== null && facets !== null && prevFacets !== facets) {
            this.fetchProductsList({ tagCode, filters: facets.filters });
        }
    }

    shouldComponentRender = () => {
        const { productsList, isFetching } = this.props;

        if (!productsList || isFetching) return false;
        return true;
    }

    fetchProductsList = (queryParams) => {
        this.props.fetchProductsListStart(queryParams);
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
        const { productsList, subcategory, facets, pagination } = this.props;
        console.log(subcategory)
        const collectionParam = subcategory.tagCodes[0];

        if (!this.shouldComponentRender()) return <Spinner />;
        
        return (
            <div className='collection-page'> 
                <h2 className='title'>{subcategory.CatName}</h2>
                
                <FilterBar 
                    setImageSize={(imageSize) => this.setImageSize(imageSize)}
                    setImageType={(imageType) => this.setImageType(imageType)}
                    imageType={imageType}
                    imageSize={imageSize}
                    facets={facets.total}
                    collectionParam={collectionParam}
                    filters={facets.filters}
                    numberOfItems={pagination.totalNumberOfResults}
                />
                <SelectedFilters 
                    filters={facets.filters} 
                    collectionParam={collectionParam}
                /> 
                <div className={`${imageSize === 'large' ? 'large-items' : ''} items`}>
                    {
                        productsList.map((item, index) => {
                            return (
                                <CollectionItem 
                                    item={item} 
                                    key={index}
                                    imageType={imageType}
                                    subcategory={subcategory}
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
    const collectionParam = ownProps.subcategory.tagCodes[0];

    return {
        productsList: selectProductsListByCollection(collectionParam)(state),
        facets: selectFacetsByCollection(collectionParam)(state),
        isFetching: selectIsCollectionFetching(state),
        pagination: selectPaginationByCollection(collectionParam)(state)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProductsListStart: (queryParams) => dispatch(fetchProductsListStart(queryParams)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList));