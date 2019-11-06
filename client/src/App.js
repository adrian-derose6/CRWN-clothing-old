import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutPage from './pages/checkout/checkout.component.js';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.js';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.js';
import TopBanner from './components/top-banner/top-banner.component';
import Footer from './components/footer/footer.component.js';

import { checkUserSession } from './redux/user/user.actions.js';

import { selectCurrentUser } from './redux/user/user.selectors.js';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.scss';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <div>
        <TopBanner />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUp />} 
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  collections: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
