import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component.js';

import { fetchProductDetailsStart } from '../../redux/shop/shop.actions.js';
import { selectProductDetailsByCode } from '../../redux/shop/shop.selectors.js';

import './product-page.styles.scss';

class ProductPage extends React.Component {
    componentDidMount() {
        const { match, fetchProductDetails, productDetails } = this.props;
        const { articleCode } = match.params; 

        if (!productDetails) {
            fetchProductDetails({ articleCode });
        }

    }

    render() {
        const { productDetails } = this.props;
        console.log(productDetails)

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
    const { articleCode }= ownProps.match.params;

    return {
        productDetails: selectProductDetailsByCode(articleCode)(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductDetails: (articleCode) => dispatch(fetchProductDetailsStart(articleCode))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);