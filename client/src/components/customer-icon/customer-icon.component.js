import React from 'react';

import customerIcon from '../../assets/customer.png';
import customerIconDark from '../../assets/customer-menu.png';

import './customer-icon.styles.scss';

const CustomerIcon = ({ dark, size}) => {
    const iconSize = size ? { height: size, width: size } : null;

    return (
        <div className='customer-icon-container'>
            <img src={dark ? customerIconDark : customerIcon} className='customer-icon' style={iconSize}/>
        </div>
    )
}

export default CustomerIcon;