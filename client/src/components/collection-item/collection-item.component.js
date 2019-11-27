import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/cart/cart.actions.js';

import './collection-item.styles.scss';

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    margin-bottom: 5px;
    opacity: ${props => props.main ? '1;' : '0;'}
    transition: opacity 0.3s ease;

    &:hover {
        opacity: ${props => props.main ? '0;' : '1;'}
    }
`

const CollectionItem = ({ item, addItem }) => {
    const { name } = item;
    const logoPicture = item.articles[0].logoPicture[0].url;
    const normalPicture = item.articles[0].images[0].url;

    return (
        <div className='collection-item'>
            <div className='image-container'>
                <BackgroundImage src={logoPicture} main={true} />
                <BackgroundImage src={normalPicture} main={false}/>
            </div>
            <div className='item-details'>
                <span className='product-name'>{name}</span>
                <span className='price'>$15</span>
                <span></span>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(
    null, 
    mapDispatchToProps
)(CollectionItem);