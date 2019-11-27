import React from 'react';

import customerIcon from '../../assets/customer.png';

import './customer-icon.styles.scss';

const CustomerIcon = (props) => {
    return (
        <div className='customer-icon-container'>
            <img src={customerIcon} className='customer-icon'/>
        </div>
    )
}

export default CustomerIcon;