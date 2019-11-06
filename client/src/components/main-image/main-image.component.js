import React from 'react';

import './main-image.styles.scss';

const MainImage = () => {
    return (
        <div className='image-container'>
            <div
                style={{
                    backgroundImage: 'url(' + require('../../assets/homepage/4.jpg') + ')'
                }}
                className='main-image'
            />
            <div className='shadow'></div>
            <div className='dyno-box'>
                <div className='copy-box'>
                    
                </div>
            </div>
        </div>  
    )
}

export default MainImage;