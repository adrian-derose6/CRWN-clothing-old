import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

import { addItem } from '../../redux/cart/cart.actions.js';

import './collection-item.styles.scss';

const BackgroundImage = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    background-image: url(${props => props.logoPicture});
    transition: background-image 0.3s;

    &:hover {
        background-image: url(${props => props.normalPicture});
    }
`

const CollectionItem = ({ item, addItem }) => {
    const { name } = item;
    const logoPicture = item.articles[0].logoPicture[0].url;
    const normalPicture = item.articles[0].images[0].url;

    console.log('rendered')
    return (
        <div className='collection-item'>
            <BackgroundImage logoPicture={logoPicture} normalPicture={normalPicture}/>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>
                ADD TO CART 
            </CustomButton>
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