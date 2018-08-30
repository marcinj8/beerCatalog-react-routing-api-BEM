import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import CardsOfBeer from '../components/Container/CardsOfBeer/CardsOfBeer';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';

import './BeerCatalog.css';

class BeerCatalog extends Component {
  state = {
    beers: null,
    page: 1,
    beerDetails: {},
    error: false,
    errorMessage: 'connection falied',
    loading: true,
    allBeersLoaded: false
  }

  componentWillMount() {
    this.getBeerList(this.state.page);
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)) {
      this.setState({
        loading: true
      })
      this.getBeerList(this.state.page);
    }
  }

  getBeerList = (page) => {
    axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=20`)
      .then(response => this.setBeerList(response))
      .catch(error => this.getDataFailed(error))
  }

  setBeerList = (response) => {
    this.isLoadedAll(response)
    let updateCardsOfBeers = [];
    if (this.state.beers) {
      updateCardsOfBeers = [
        ...this.state.beers
      ]
      if (this.state.beers[this.state.beers.length - 1].id >= response.data[response.data.length - 1].id) {
        return
      }
    }
    for (let key in response.data) {
      updateCardsOfBeers.push({
        ...response.data[key],
        beerID: key
      })
    }
    this.setState({
      beers: updateCardsOfBeers,
      page: this.state.page + 1,
      loading: false,
      error: false
    })
  }

  isLoadedAll = response => {
    if (response !== undefined && response.data.length <= 0) {
      this.setState({
        allBeersLoaded: true
      })
    }
  }

  getDataFailed = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  showBeerDetailsHandler = (id) => {
    this.props.history.push({ pathname: '/details/' + id })
    const beerList = {
      ...this.state.beers
    }
    let beer = {};

    for (let key in beerList) {
      if (beerList[key].beerID === id) {
        beer = this.state.beers[key]
      }
    }
    this.setState({
      beerDetails: beer,
    })
  }

  render() {
    let showData = null;
    let loadingData = <div className='beerCatalog__loading'></div>;

    if (this.state.loading) {
      showData = <Spinner />
      loadingData = <div className='beerCatalog__loading'>Loading...</div>
    }
    if (this.state.allBeersLoaded) {
      showData = <Spinner />
      loadingData = <div className='beerCatalog__loading'>You see all beers! Cheers!</div>
    }
    if (this.state.error) {
      showData = this.state.errorMessage
    }
    if (this.state.beers) {
      showData = <CardsOfBeer
        showDetails={this.showBeerDetailsHandler}
        beers={this.state.beers} />
    }
    
    return (
      <div className="App">
        {showData}
        {
          <Route path={this.props.match.url + "details/:id"} exact component={Modal} />
        }
        {loadingData}
      </div>
    );
  }
}

export default BeerCatalog;
