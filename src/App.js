import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navbar/Navbar';
import BeerCatalog from './container/BeerCatalog';

import './App.css';

class App extends Component {
  state = {
    showModal: false
  }


  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Route path="/" component={ BeerCatalog }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
