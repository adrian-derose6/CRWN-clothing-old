import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg';

import RightPopover from '../right-popover/right-popover.component';
import NavPopover from '../nav-popover/nav-popover.component';
import CustomerIcon from '../customer-icon/customer-icon.component';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CustomerPopoverContent from '../customer-popover-content/customer-popover-content.component.js';
import BagPopoverContent from '../bag-popover/bag-popover.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';

import guysNavImage from '../../assets/nav-dropdowns/guys-nav-image.jpg';
import girlsNavImage from '../../assets/nav-dropdowns/girls-nav-image.jpg';
import bottomsNavImage from '../../assets/nav-dropdowns/bottoms-nav-image.jpg';

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
                <div className='options'>
                    <RightPopover icon={<CustomerIcon />}>
                        <CustomerPopoverContent />
                    </RightPopover>

                    <RightPopover icon={<CartIcon />} >
                        <BagPopoverContent />
                    </RightPopover>
                </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 900px)">
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                    <span className='brand-name'>CRWN</span>
                </Link>
                <div className='options left'>
                    <NavPopover label='Guys' value='guys' link='/guys/all-guys' image={guysNavImage}/>
                    <NavPopover label='Girls' value='girls' link='/girls/all-girls' image={girlsNavImage} />
                    <NavPopover label='Kids' value='guys'/>
                    <NavPopover label='Bottoms' value='guys' image={bottomsNavImage} />
                    <NavPopover label='Jackets' value='girls' />
                </div>
                <div className='options'>                 
                    <RightPopover icon={<CustomerIcon />}>
                        <CustomerPopoverContent />
                    </RightPopover>
                    
                    <RightPopover icon={<CartIcon />} >
                        <BagPopoverContent />
                    </RightPopover>
                </div>
                { hidden ? null : <CartDropdown /> }
            </MediaQuery>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);