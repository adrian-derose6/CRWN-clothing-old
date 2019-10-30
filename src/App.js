import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import HatsPage from './pages/hatspage/hatspage.component';
import './App.css';


function App() {
  return (
    <div className="App">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
    </div>
  );
}

export default App;
