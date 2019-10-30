import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import HatsPage from './pages/hatspage/hatspage.component';
import ShopPage from './pages/shop/shop.component.js';
import './App.css';


function App() {
  return (
    <div className="App">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
    </div>
  );
}

export default App;
