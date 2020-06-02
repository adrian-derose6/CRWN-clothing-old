import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import Select from 'react-select'
import { Carousel } from 'react-responsive-carousel';

import NavBreadcrumbs from '../../components/nav-breadcrumbs/nav-breadcrumbs.component';
import ArticleSelector from './article-selector.component.js';
import Spinner from '../../components/spinner/spinner.component.js';
import HeartIcon from '../../assets/heart-icon.js';
import CustomButton from '../../components/custom-button/custom-button.component.js';
import { ReactComponent as BagIcon } from '../../assets/shopping-bag-3.svg';

import { fetchProductDetailsStart } from '../../redux/shop/shop.actions.js';
import { selectProductDetailsByCode } from '../../redux/shop/shop.selectors.js';

import './product-page.styles.scss';

const selectionStyles = {
    control: base => ({
        ...base,
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        cursor: 'pointer'
    }),
    container: base => ({
        ...base,
        border: '1px solid lightgray',
        borderRadius: 0
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected || state.isFocused ? "lightgray" : 'none',
        cursor: 'pointer'
    })
}

export const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    margin-bottom: 5px;
`

class ProductPage extends React.Component {
    state = {
        selectedArticle: null,
        selectedVariant: null,
        styleWithList: null
    };

    componentDidMount() {
        const { match, fetchProductDetails } = this.props;
        const { articleCode } = match.params; 

        fetchProductDetails({ articleCode });
    }

    componentDidUpdate(prevProps, prevState) {
        const { productDetails } = this.props;
        const { selectedArticle } = this.state;

        if (productDetails && !selectedArticle) {    
            const { articlesList } = productDetails;

            articlesList.forEach(item => {
                if (item.color.code === productDetails.color.code) {
                    this.setSelectedArticle(item);
                    return;
                }
            });
        } 
    }

    /*fetchStyleWithList = async () => {
        const { selectedArticle } = this.state;
        const styleWithCodes = selectedArticle.styleWith.map(item => item.code);

        const styleWithList = styleWithCodes.map(async (code) => {
            const response = await fetch(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?country=us&lang=en&productcode=${code}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
                    "x-rapidapi-key": "0e3e663af0msh5a39e9c2bfe5aecp190e1ajsn157832385380",
                }
            });

            const responseJSON = await response.json();
            console.log(responseJSON.product)
            const displayedArticle = responseJSON.product.articlesList.find(item => item.code === code);
            const articleCode = displayedArticle.code;
            const thumbnailUrl = displayedArticle.galleryDetails[0];

            return {
                articleCode,
                thumbnailUrl
            }
        });

        await Promise.all(styleWithList).then(results => this.setState({ styleWithList: results }))
    } */

    getVariantSelection = (variantsList) => {
        if (!variantsList) return [];
        
        const variantsSelection = variantsList.filter(variant => Object.keys(variant).length !== 0)
        .map((variant, index) => {
            const label = variant.size.name;

            return {
                label,
                value: variant
            }
        });

        return variantsSelection;
    }

    setSelectedArticle = (article) => {
        this.setState({ selectedArticle: article });
    }

    setSelectedVariant = (variant) => {
        this.setState({ selectedVariant: variant });
    }

    onBagClick = () => {
        const { selectedVariant } = this.state;

        if (!selectedVariant) return;
    }

    render() {
        const { productDetails, location } = this.props;
        const { selectedArticle, selectedVariant, styleWithList } = this.state;
        const { subcategory } = location.state;

        if (!productDetails || !selectedArticle) return <Spinner />;

        const { description, fits, code, name } = productDetails;
        const galleryDetails = selectedArticle.galleryDetails;
        const productDescription = description || '';
        const fit = fits ? fits[0] : null;
        const compositions = selectedArticle.compositions;
        const modelHeight = selectedArticle.modelHeight;
        const price = `$${selectedArticle.whitePrice.price}` || '';
        const variantsSelection = this.getVariantSelection(selectedArticle.variantsList);

        return (
            <div className='product-page'>
                <NavBreadcrumbs />
                <div className='top-container'>
                    <div className='description-container'>
                        <div className='image-row'>
                            { galleryDetails.map((item, index) => {
                                if (index > 1) return null;
                                const url = item.url + '&call=url[file:/product/main]';
                                return (
                                    <div className='image-container'>
                                        <Suspense fallback={<Spinner />}>
                                            <BackgroundImage src={url} />
                                        </Suspense>
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
                                        <Suspense fallback={<Spinner />}>
                                            <BackgroundImage src={url} />
                                        </Suspense>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                    <div className='selection-box'>
                        <div className='inner'>
                            <div className='name-price'>
                                <div className="name-heart">
                                    <span>{name}</span>
                                    <HeartIcon className='heart-icon' selected={false} onClick={() => null}/>
                                </div>
                                <span className='price'>{price}</span>
                            </div>
                            <div className='slider-container'>
                                <ArticleSelector 
                                    articlesList={productDetails.articlesList} 
                                    onSelect={(article) => this.setSelectedArticle(article)} 
                                    selectedArticle={this.state.selectedArticle}
                                /> 
                            </div>
                            <Select 
                                isSearchable={false}
                                onChange={this.setSelectedVariant}
                                options={variantsSelection}
                                placeholder='Select size'
                                styles={selectionStyles}
                            />

                            <CustomButton 
                                style={{marginTop: 20, marginBottom: 20, height: 45}} 
                                onClick={() => this.onBagClick}
                                inactive={(!this.state.selectedVariant)}
                            >
                                <BagIcon className='bag-icon' />
                                <span style={{marginLeft: 10}}>ADD</span>
                            </CustomButton>
                        </div>
                    </div>
                </div>
                <div>
                    <span>Style With</span>
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