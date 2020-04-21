import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component.js';

import { fetchProductDetailsStart } from '../../redux/shop/shop.actions.js';

import './product-page.styles.scss';

class ProductPage extends React.Component {
    componentDidMount() {
        const { match, fetchProductDetails, productDetails } = this.props;
        const { productId } = match.params; 

        console.log(productId)
        if (!productDetails) {
            fetchProductDetails(productId);
        }

    }

    render() {
        const { productDetails} = this.props;

        return (
            <div className='product-page'>
                {(!productDetails) ? 
                    <Spinner />
                    : 
                    <span>{productDetails.name}</span>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { productId } = ownProps.match.params;

    return {
        productDetails: state.shop.productDetails[productId]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductDetails: (productId) => dispatch(fetchProductDetailsStart(productId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);