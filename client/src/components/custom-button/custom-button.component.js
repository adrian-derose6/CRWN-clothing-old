import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, inactive, ...otherProps }) => (
    <button 
        className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted': ''} ${inactive ? 'inactive' : ''}
        custom-button`} 
        {...otherProps}
    >
        {children}
    </button>
)

export default CustomButton;