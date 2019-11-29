import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';

import NavPopover from '../nav-popover/nav-popover.component';
import CustomerIcon from '../customer-icon/customer-icon.component';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { signOutStart } from '../../redux/user/user.actions';

import guysNavImage from '../../assets/nav-dropdowns/guys-nav-image.jpg';
import girlsNavImage from '../../assets/nav-dropdowns/girls-nav-image.jpg';

import './header.styles.scss';

const Header = ({ currentUser, hidden, signOutStart }) => {

    return (
        <div className='header'>
            <MediaQuery query="(max-width: 900px)">
                <MenuIcon className='menu-icon'/>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                    <span className='brand-name'>CRWN</span>
                </Link>
                <CartIcon />
            </MediaQuery>
            <MediaQuery query="(min-width: 900px)">
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                    <span className='brand-name'>CRWN</span>
                </Link>
                <div className='options left'>
                    <NavPopover label='Guys' link='/guys/all-guys' image={guysNavImage}/>
                    <NavPopover label='Girls' link='/girls/all-girls' image={girlsNavImage} />
                    <NavPopover label='Kids' />
                    <NavPopover label='Bottoms' />
                    <NavPopover label='Jackets' />
                </div>
                <div className='options'>
                    {
                        currentUser ? 
                            <div className='option' onClick={signOutStart}>SIGN OUT</div>
                            : 
                            <Link className='option' to='/signin'>
                                <UserIcon />
                            </Link>
                    }
                    <CustomerIcon />
                    <CartIcon />
                </div>
                { hidden ? null : <CartDropdown />}
            </MediaQuery>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);