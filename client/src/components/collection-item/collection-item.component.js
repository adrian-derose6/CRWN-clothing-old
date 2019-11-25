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
    position: absolute;
    margin-bottom: 5px;
    opacity: ${props => props.main ? '1;' : '0;'}
    background-image: url(${props => props.src});
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
            <BackgroundImage src={logoPicture} main={true} />
            <BackgroundImage src={normalPicture} main={false}/>
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