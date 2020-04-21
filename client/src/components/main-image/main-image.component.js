import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import copyImage from '../../assets/homepage/homepage-copy.png';

import './main-image.styles.scss';

const MainImage = () => {
    return (
        <div className='image-container'>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
            <div className='shadow'></div>
            <div className='dyno-box'>
                <img src={copyImage} className='copy-image'/>
                
                <span className='copy-details'>Exclusions apply. <span className='details-link'>Details</span>
                </span>
                <div className='call-to-action'>
                    <Link to='/girls/all-girls'>
                        <CustomButton inverted style={buttonStyles}>Shop Girls</CustomButton>
                    </Link>
                    <Link to='/guys/all-guys'>
                        <CustomButton inverted style={buttonStyles}>Shop Guys</CustomButton>
                    </Link>
                </div>
            </div>
        </div>  
    )
}

const buttonStyles = {
    background: 'transparent',
    border: '3px solid white',
    color: 'white',

}

export default MainImage;