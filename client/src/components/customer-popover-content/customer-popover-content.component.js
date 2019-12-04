import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomerIcon from '../customer-icon/customer-icon.component';
import CustomButton from '../custom-button/custom-button.component.js';
import onlineOrdersIcon from '../../assets/online-orders.png';
import pointsIcon from '../../assets/points.png';
import transactionIcon from '../../assets/transaction.png';

import { signOutStart } from '../../redux/user/user.actions';

import './customer-popover-content.styles.scss';

const CustomerPopoverContent = ({ user, signOutStart }) => {

    const renderUserInfo = () => {
        return (
            <div style={{ width: '100%'}}>
                <div className='top-container' style={{paddingBottom: '15px'}}>
                    <span className='logo'>CRWN<span style={{ color: '#9c2224'}}>/</span>NEXT</span>
                </div>
                <div className='menu-container'>
                    <div className='menu-item'>
                        <CustomerIcon dark />
                        <span className='menu-text'>Account Overview</span>
                    </div>
                    <div className='menu-item'>
                        <img src={onlineOrdersIcon} className='icon' />
                        <span className='menu-text'>Online Orders</span>
                    </div>
                    <div className='menu-item'>
                        <img src={pointsIcon} className='icon' />
                        <span className='menu-text'>Earn Points</span>
                    </div>
                    <div className='menu-item'>
                        <img src={transactionIcon} className='icon' />
                        <span className='menu-text'>Pay Your Bill</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='customer-popover-content'>
            {
                (user) ? renderUserInfo()
                :
                    <div className='top-container'>
                        <span className='logo'>CRWN<span style={{ color: '#9c2224'}}>/</span><span style={{fontFamily: 'Sharp Sans No1 Medium'}}>NEXT</span></span>
                        <span style={{ color: '#9c2224', fontSize: '16px'}}>shop.engage.</span>
                        <span style={{ color: '#9c2224', fontSize: '22px', marginBottom: '22px', fontFamily: 'Sharp Sans No1 Semibold'}}>earn rewards.</span>
                        <div className='button-container'>
                            <Link to='/signin'><CustomButton style={buttonStyles} inverted>Sign In</CustomButton></Link>
                            <Link to='/signin'><CustomButton style={buttonStyles}>Join Now</CustomButton></Link>
                        </div>
                    </div>
            }       
            <div className='bottom-container'>
                <span className='bolded'>Help & More</span>
                <span className='normal'>Track Order</span>                
                <span className='normal'>Find a Store</span>
                <span className='normal'>Gift Cards</span>
                <span className='normal'>Contact Us</span>
                { user ? <span className='normal' onClick={signOutStart}>Sign Out</span> : null}
            </div>
        </div>
    );
}

const buttonStyles = {
    fontFamily: 'Sharp Sans No1 Semibold',
    margin: '5px',
    height: '45px'
}

const MenuItem = () => {
    return (
        <div className='customer-popover-menu-item'>

        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerPopoverContent);