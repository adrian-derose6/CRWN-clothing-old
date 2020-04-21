import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import bagDarkIcon from '../../assets/shopping-bag-dark.png';

import './bag-popover.styles.scss';

const BagPopoverContent = ({ cartItems }) => {
    const newCart = [{name: 'item'}].concat(cartItems);

    const renderEmptyBag = () => (
        <div className='item-list'>
            <img src={bagDarkIcon} className='bag-icon'/>
            <span className='empty-text'>Your shopping bag is empty.</span>
        </div>
    );

    return (
        <div className='bag-popover-content'>
            {(cartItems.length < 1) ? renderEmptyBag()
                : 
                <div className='item-list'>
                    <img src={bagDarkIcon} className='bag-icon'/>
                    <span className='empty-text'>Your shopping bag is not empty.</span>
                </div>
            }    
            <div className='order-details'>
                <div className='detail-row'>
                    <span className='bold'>Order Value:</span>
                    <span>$9.99</span>
                </div>
                <div className='detail-row'>
                    <span className='bold'>Standard Shipping:</span>
                    <span>$0.00</span>
                </div>
                <div style={{width: '100%', padding: '0 22px'}}>
                    <div className='divider' />
                </div>
                <div className='detail-row'>
                    <span className='bold' style={{fontSize: '17px'}}>Total:</span>
                    <span className='bold'>$0.00</span>
                </div>
                <div className='button-container'>
                    <CustomButton style={buttonStyles}>Checkout</CustomButton>
                    <CustomButton style={buttonStyles} inverted>Shopping Bag</CustomButton>
                </div>
            </div>
        </div>
    )
}

const buttonStyles = {
    marginTop: '15px',
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(
    mapStateToProps
)(BagPopoverContent);