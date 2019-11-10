import React from 'react';
import MediaQuery from 'react-responsive';

import './main-image.styles.scss';

const MainImage = () => {
    return (
        <div className='image-container'>
            <MediaQuery query='(min-width: 800px)'>
                <div
                    style={{
                        backgroundImage: 'url(' + require('../../assets/homepage/4.jpg') + ')'
                    }}
                    className='main-image'
                />
            </MediaQuery>
            <MediaQuery query='(max-width: 800px)'>
                <div
                    style={{
                        backgroundImage: 'url(' + require('../../assets/homepage/2.jpg') + ')'
                    }}
                    className='main-image'
                />
            </MediaQuery>
            <div className='shadow'></div>
            <div className='dyno-box'>
                <div className='copy-box'>
                    
                </div>
            </div>
        </div>  
    )
}

export default MainImage;