import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../UI/Spinner/Spinner';
import CardsOfBeer from '../Container/CardsOfBeer/CardsOfBeer';

class SimillarBeers extends Component {
  state = {
    loading: true,
    simillarBeers: null,
    ibu_gt: 1,
    ibu_lt: 1000,
    abv_gt: 1,
    abv_lt: 1000,
    ebc_gt: 1,
    ebc_lt: 1000,
    error: false
  }

  componentDidUpdate() {
    if (this.state.loading) {
      this.getSimillarBeers()
    }
  }

  componentDidMount() {
    this.getBeerfeatures()
  }

  getBeerfeatures = () => {
    let beer = {
      ...this.props.beer
    }

    let ibu_gt = Math.round(beer.ibu * .7);
    let ibu_lt = Math.round(beer.ibu * 1.3);
    let abv_gt = Math.round(beer.abv * .5);
    let abv_lt = Math.round(beer.abv * 1.5);
    let ebc_gt = Math.round(beer.ebc * .6);
    let ebc_lt = Math.round(beer.ebc * 1.4);

    if (beer.ibu === null) {
      ibu_gt = this.state.ibu_gt;
      ibu_lt = this.state.ibu_lt;
    }
    if (beer.abv === null) {
      abv_gt = this.state.abv_gt;
      abv_lt = this.state.abv_lt;
    }
    if (beer.ebc === null) {
      ebc_gt = this.state.ebc_gt;
      ebc_lt = this.state.ebc_lt;
    }

    this.setState({
      ibu_gt: ibu_gt,
      ibu_lt: ibu_lt,
      abv_gt: abv_gt,
      abv_lt: abv_lt,
      ebc_gt: ebc_gt,
      ebc_lt: ebc_lt,
    })
  }

  setSimillarBeers = res => {
    let simillarBeers = [];
    for (let key in res.data) {
      if (res.data[key].id !== this.props.beer.id && simillarBeers.length < 3) {
        simillarBeers.push(res.data[key])
      }
    }
    if(simillarBeers.length < 1) {
      simillarBeers = null;
    }
    this.setState({
      simillarBeers: simillarBeers,
      loading: false,
      error: false,
    })
  }

  getBeersFailed = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  getSimillarBeers = () => {
    axios.get(`https://api.punkapi.com/v2/beers?ibu_gt=${this.state.ibu_gt}&ibu_lt=${this.state.ibu_lt}&abv_gt=${this.state.abv_gt}&abv_lt=${this.state.abv_lt}&ebc_gt=${this.state.ebc_gt}&ebc_lt=${this.state.ebc_lt}&page=1&per_page=4`)
      .then(res => this.setSimillarBeers(res))
      .catch(error => this.getBeersFailed())
  }

  render() {
    let content = (
      <div style={{
        fontWeight: 'bold',
        padding: '25px',
        height: '30px',
        width: '100%',
        textAlign: 'center'
      }}>There is no simillar beers</div>
    );;
    if (this.state.loading) {
      content = <Spinner />
    }
    if (this.state.error) {
      content = (
        <div style={{
          fontWeight: 'bold',
          padding: '25px',
          height: '30px',
          width: '100%',
          textAlign: 'center',
        }}>Error, plase try again</div>
      );
    }
    if (this.state.simillarBeers) {
      content = <CardsOfBeer
        simillarBeers={true}
        showDetails={this.props.showBeerDetails}
        beers={this.state.simillarBeers} />
    }

    return content
  }
}

export default SimillarBeers; 