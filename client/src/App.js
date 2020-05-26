import React, { useEffect, lazy, Suspense} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component.js';
import TopBanner from './components/top-banner/top-banner.component';
import Footer from './components/footer/footer.component.js';
import Spinner from './components/spinner/spinner.component.js';
import ErrorBoundary from './components/error-boundary/error-boundary.component.js';

import { checkUserSession } from './redux/user/user.actions.js';
import { selectCurrentUser } from './redux/user/user.selectors.js';
import { fetchCategoriesStart } from './redux/shop/shop.actions';
import { selectCategories } from './redux/shop/shop.selectors';

import './App.scss';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component.js'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component.js'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const ProductPage = lazy(() => import('./pages/product-page/product-page.component.js'));

const App = ({ categories, checkUserSession, user, clearCart, fetchCategoriesStart}) => {
  useEffect(() => {
    checkUserSession();
    fetchCategoriesStart();
  }, [checkUserSession]);

  return (
    <div>
      <div>
        <TopBanner />
        <Header />
          <div style={{ minHeight: '100vh' }}>
            <Switch>
              <ErrorBoundary> 
                <Suspense fallback={<Spinner />}>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/:categoryId(men|ladies)' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/product-page/:articleCode' component={ProductPage} />
                    <Route 
                      exact 
                      path='/signin' 
                      render={() => user ? <Redirect to='/' /> : <SignInAndSignUp />} 
                    />
                </Suspense>
              </ErrorBoundary>
            </Switch>
          </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  categories: selectCategories
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
