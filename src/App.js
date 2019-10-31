import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import HatsPage from './pages/hatspage/hatspage.component';
import ShopPage from './pages/shop/shop.component.js';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.js';

import { setCurrentUser } from './redux/user/user.actions.js';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });

        })
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />} 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null, 
  mapDispatchToProps
)(App);
