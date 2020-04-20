import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import equal from 'fast-deep-equal';

import { fetchProductsListStart } from '../../redux/shop/shop.actions';
import { selectProductsListByCollection, selectFacetsByCollection, selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

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
        const { productsList, isFetching } = this.props;
        this.fetchProductsList();
    }

    shouldComponentRender = () => {
        const { productsList, isFetching } = this.props;

        if (!productsList || isFetching) return false;
        return true;
    }

    /*componentDidUpdate(prevProps) {
        if (!equal(this.props.filters, prevProps.filters) && prevProps.filters !== null) {
            this.fetchCollection();
        }
    }*/

    fetchProductsList = () => {
        const { subcategory } = this.props;
        const tagCode = subcategory.tagCodes[0];

        console.log(tagCode)
        this.props.fetchProductsListStart({ tagCode });
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
        const { productsList, subcategory, facets } = this.props;
        const collectionParam = subcategory.tagCodes[0];
        
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{subcategory.CatName}</h2>
                <span className='description'>This is the description</span>
                <FilterBar 
                    setImageSize={(imageSize) => this.setImageSize(imageSize)}
                    setImageType={(imageType) => this.setImageType(imageType)}
                    imageType={imageType}
                    imageSize={imageSize}
                    facets={facets.total}
                    collectionParam={collectionParam}
                    filters={facets.filters}
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
        isFetching: selectIsCollectionFetching(state)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProductsListStart: (queryParams) => dispatch(fetchProductsListStart(queryParams)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList));