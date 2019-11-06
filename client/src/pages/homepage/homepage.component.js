import React from 'react';

import Directory from '../../components/directory/directory.component.js';
import MainImage from '../../components/main-image/main-image.component.js';

import './homepage.styles.scss';

const HomePage = () => {
    return (
        <div className='homepage'>
            <MainImage />
            <Directory />
        </div>
    )
} 

export default HomePage;