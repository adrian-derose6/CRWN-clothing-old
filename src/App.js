import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutPage from './pages/checkout/checkout.component.js';
import HomePage from './pages/homepage/homepage.component';
import HatsPage from './pages/hatspage/hatspage.component';
import ShopPage from './pages/shop/shop.component.js';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.js';
import TopBanner from './components/top-banner/top-banner.component';
import Footer from './components/footer/footer.component.js';

import { setCurrentUser, checkUserSession } from './redux/user/user.actions.js';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors.js';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
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
              render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />} 
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
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
