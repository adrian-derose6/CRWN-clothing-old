import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import equal from 'fast-deep-equal';

import { fetchProductsListStart } from '../../redux/shop/shop.actions';
import { selectProductsListByCollection } from '../../redux/shop/shop.selectors';

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
        const { productsList, category, subcategory } = this.props;
        console.log(productsList);
        
        if (!this.shouldComponentRender()) return <Spinner />;

        return (
            <div className='collection-page'> 
                <h2 className='title'>{subcategory.CatName}</h2>
                <span className='description'>This is the description</span>
                {/*<FilterBar 
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
                />*/}
                <div className={`${imageSize === 'large' ? 'large-items' : ''} items`}>
                    {
                      /* productsList.map((item, index) => {
                            return (

                                    <CollectionItem 
                                        item={item} 
                                        key={index}
                                        imageType={imageType}
                                    />
                            )
                        }) */
                    }
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const collectionParam = ownProps.subcategory.tagCodes[0];
    console.log(collectionParam);

    return {
        productsList: selectProductsListByCollection(collectionParam)(state),
        isFetching: state.shop.isFetching
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProductsListStart: (queryParams) => dispatch(fetchProductsListStart(queryParams)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionList));