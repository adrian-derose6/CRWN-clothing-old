import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
            <span className='brand-name'>CRWN</span>
        </Link>
        <div className='options left'>
            <Link className='option' to='/shop/guys'>
                GUYS
            </Link>
            <Link className='option' to='/shop/girls'>
                GIRLS
            </Link>
            <Link className='option' to='/shop/hats'>
                HATS
            </Link>
            <Link className='option' to='/shop/jackets'>
                JACKETS
            </Link>
            <Link className='option' to='/shop/sneakers'>
                SNEAKERS
            </Link>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
        </div>
        <div className='options'>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={signOutStart}>SIGN OUT</div>
                : 
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown />}
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);