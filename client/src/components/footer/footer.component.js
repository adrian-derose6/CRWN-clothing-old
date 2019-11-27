import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './footer.styles.scss';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='link-list-container'>
                <div className='link-list'>
                    <span className='label'>Shop</span>
                    <span className='sublabel'>By Category:</span>
                    <span className='link'>Guys</span>
                    <span className='link'>Girls</span>
                    <span className='link'>Hats</span>
                    <span className='link'>Jackets</span>
                    <span className='link'>Sneakers</span>
                </div>
                <div className='link-list'>
                    <span className='label'>Support</span>
                    <span className='link'>FAQs</span>
                    <span className='link'>Store Locator</span>
                </div>
                <div className='link-list'>
                    <span className='label'>Company</span>
                    <span className='link'>Terms of Use</span>
                    <span className='link'>Privacy</span>
                    <span className='link'>Careers</span>
                    <span className='link'>About</span>
                    <span className='link'>CA Supply Chains Act</span>
                    <span className='link'>Sustainability</span>
                    <span className='link'>Affiliates</span>
                    <span className='link'>Recall Info</span>
                </div>
                <div className='link-list'>
                    <span className='label'>Contact</span>
                    <span className='link'>Contact Us</span>
                    <span style={{marginBottom: 30}} className='link'>Order Status</span>
                    <span className='sublabel'>Address</span>
                    <span style={{marginBottom: 30}} className='misc'>1588 South Coast Dr<br/>Costa Mesa, CA 92626</span>
                    <span className='sublabel'>Hours</span>
                    <span className='misc'>M - F 6:00am - 8:00pm PST<br/>Sat & Sun 9:30am - 6:00pm PST</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;