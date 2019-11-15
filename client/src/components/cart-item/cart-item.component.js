import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { images, name, quantity }}) => (
    <div className='cart-item'>
        <img src={images[0].url} alt='item' />
        <div className='item-details'>
            <span className='name'>{name}</span> 
            <span className='price'>
                {quantity} 
            </span>          
        </div>
    </div>
);

export default React.memo(CartItem);