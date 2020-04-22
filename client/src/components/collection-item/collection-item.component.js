import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/cart/cart.actions.js';

import HeartIcon from '../../assets/heart-icon.js';

import './collection-item.styles.scss';

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    margin-bottom: 5px;
    opacity: ${props => props.main ? '1' : '1'};
    z-index: ${props => props.main ? '1000' : '500'};
    transition: opacity 0.3s ease;

    &:hover {
        opacity: ${props => props.main ? '0' : '1'};
    }
`

const CollectionItem = ({ item, imageType }) => {
    const [favorited, setFavorited] = useState(false);
    const { name, price, articleCodes } = item;
    const rgbColors = item.rgbColors ? item.rgbColors : [item.defaultArticle.rgbColor];
    const articleCode = item.articles[0].code;
    const logoPicture = item.defaultArticle.logoPicture[0].url;
    const normalPicture = item.defaultArticle.images[0].url;

    const toggleFavorited = () => {
        setFavorited(!favorited);
    }

    if (!item) return null;
    return (
        <div className='collection-item'>
            <Link to={`/product-page/${articleCode}`}>
                <div className='image-container'>
                    <BackgroundImage src={logoPicture} main={imageType === 'model'} />
                    <BackgroundImage src={normalPicture} main={imageType === 'product'}/>
                    <HeartIcon className='heart-icon' selected={favorited} onClick={toggleFavorited}/>
                </div>
            </Link>
            <div className='item-details'>
                <span className='product-name'>{name}</span>
                <span className='price'>{`$${price.value}`}</span>
                <div className='colors-row'>
                    {
                        rgbColors.map((color, c) => {
                            return (
                                <div className='color-circle' style={{ background: color }} key={c}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
});

export default CollectionItem;