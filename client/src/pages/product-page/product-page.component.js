import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../../components/spinner/spinner.component.js';

import { fetchProductDetailsStart } from '../../redux/shop/shop.actions.js';
import { selectProductDetailsByCode } from '../../redux/shop/shop.selectors.js';

import './product-page.styles.scss';

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    margin-bottom: 5px;
`

class ProductPage extends React.Component {
    componentDidMount() {
        const { match, fetchProductDetails, productDetails } = this.props;
        const { articleCode } = match.params; 

        fetchProductDetails({ articleCode });

    }

    render() {
        const { productDetails } = this.props;

        if (!productDetails) return <Spinner />;

        const { articlesList, description } = productDetails;
        console.log(productDetails)
        const galleryDetails = articlesList[0].galleryDetails;
        const productDescription = description || '';

        return (
            <div className='product-page'>
                <div className='top-container'>
                    <div className='description-container'>
                        <div className='image-row'>
                            { galleryDetails.map((item, index) => {
                                if (index > 1) return null;
                                const url = item.url + '&call=url[file:/product/main]';
                                return (
                                    <div className='image-container'>
                                        <BackgroundImage src={url} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='info-box'>
                            <p className='description-text'>{description}</p>
                        </div>
                        <div className='image-row'>
                            { galleryDetails.map((item, index) => {
                                if (index <= 1) return null;
                                const url = item.url + '&call=url[file:/product/main]';
                                return (
                                    <div className='image-container'>
                                        <BackgroundImage src={url} />
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                    <div className='selection-box'>

                    </div>
                </div>
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
        fetchProductDetails: (articleUrlParams) => dispatch(fetchProductDetailsStart(articleUrlParams))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);