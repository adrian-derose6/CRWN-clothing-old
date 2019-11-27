import React from 'react';

import './small-icon.styles.scss';

const SmallIcon = ({ selected, large, onClick}) => {
    if (large) return <div className={`${selected ? 'selected' : ''} large-icon`} onClick={() => onClick('large')}/>;

    return (
        <div className={`${selected ? 'selected' : ''} small-icon-container`} onClick={() => onClick('small')}>
            <div className='inner-box'></div>
            <div className='inner-box'></div>
            <div className='inner-box'></div>
            <div className='inner-box'></div>
        </div>
    )
}

export default SmallIcon;