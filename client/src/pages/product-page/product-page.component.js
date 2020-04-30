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
    state = {
        selectedArticle: null
    };

    componentDidMount() {
        const { match, fetchProductDetails, productDetails } = this.props;
        const { articleCode } = match.params; 

        fetchProductDetails({ articleCode });
    }

    componentDidUpdate(prevProps) {
        const { productDetails } = this.props;
        const { selectedArticle } = this.state;

        if (productDetails && !selectedArticle) {    
            const { articlesList } = productDetails;
            articlesList.forEach(item => {
                if (item.color.code === productDetails.color.code) {
                    this._setSelectedArticle(item);
                    return;
                }
            });
        }
    }

    _setSelectedArticle = (article) => {
        this.setState({ selectedArticle: article });
    }

    render() {
        const { productDetails } = this.props;
        const { selectedArticle } = this.state;

        if (!productDetails || !selectedArticle) return <Spinner />;
        
        console.log(selectedArticle);
        const { description, fits, code } = productDetails;
        const galleryDetails = selectedArticle.galleryDetails;
        const productDescription = description || '';
        const fit = fits ? fits[0] : null;
        const compositions = selectedArticle.compositions;
        const modelHeight = selectedArticle.modelHeight;

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
                            <div className='info-content'>
                                <p className='description-text'>{description}</p>
                                <dl className='description-list'>
                                    { (modelHeight) ? (
                                        <div className='description-list-item'>
                                            <dt>Size</dt>
                                            <dd>{`This model is ${modelHeight}.`}</dd>                                       
                                        </div>
                                        )
                                        : null
                                    }
                                    { (fit) ?
                                        <div className='description-list-item'>
                                            <dt>Fit</dt>
                                            <dd>{fit}</dd>                                       
                                        </div>
                                        : null
                                    }
                                    <div className='description-list-item'>
                                        <dt>Composition</dt>
                                        <dd>{compositions.map((comp, index) => {
                                                const materials = comp.materials.map((mat) => `${mat.name} ${mat.percentage}%`).join(', ');
                                                return comp.compositionType ? `${comp.compositionType}: ${materials}, ` : `${materials}`
                                            })}
                                        </dd>                                       
                                    </div>
                                    <div className='description-list-item'>
                                        <dt>Article No.</dt>
                                        <dd>{code}</dd>                                       
                                    </div>
                                </dl>
                            </div>
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