import React from 'react';

import './heart-icon.scss';

const HeartIcon = ({ selected, className, onClick }) => (
    <div className={`${className}`} styles={{ height: '30px', width: '30px' }}>
        <svg onClick={onClick} className={`${selected ? 'selected' : ''} heart-icon-svg`} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-1 0 26 26" stroke='black' fill='white'>
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
        </svg>
    </div>
);

export default HeartIcon;