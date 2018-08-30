import React, { Component } from 'react';
import Aux from 'react-aux';
import axios from 'axios';

import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';
import SimillarBeers from '../../components/SimillarBeers/SimillarBeers';

import './Modal.css';

class Modal extends Component {
  state = {
    beer: null,
    loading: true
  }

  componentDidMount() {
    this.getBeerData();
  }

  setBeerDetails = response => {
    let setBeer = [];
    for (let key in response.data) {
      setBeer.push({
        ...response.data[key],
        beerID: key
      })
    }
    this.setState({
      beer: setBeer[0],
      loading: false
    })
  }

  getBeerFailed = error => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getBeerData = () => {
    axios.get(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`)
      .then(response => this.setBeerDetails(response))
      .catch(error => this.getBeerFailed(error))
  }

  closeModal = () => {
    this.props.history.push({ pathname: '/' })
  }

  showBeerDetailsHandler = (id) => {
    this.props.history.replace({ pathname: '/details/' + id });
    window.location.reload()
  }

  render() {
    let content = null;

    if (!this.state.beer) {
      return content
    }
    if (this.state.loading) {
      content = (
        <Aux>
          <Backdrop show clicked={this.closeModal} />
          <Spinner />
        </Aux>
      )
    }
    if (this.state.beer) {
      content = (
        <Aux>
          <Backdrop show clicked={this.closeModal} />
          <div className='modal'>
            <div className='modal__flex'>
              <div className='modal__img'><img src={this.state.beer.image_url} alt={this.state.beer.name} /></div>
              <div className='modal__details'>
                <h2>{this.state.beer.name}</h2>
                <h5>{this.state.beer.tagline}</h5>
                <div className='modal__detailsUnderscore'></div>
                <div >
                  <span className='modal__beerIndex'><strong>IBU:</strong> {this.state.beer.ibu}</span>
                  <span className='modal__beerIndex'><strong>ABV:</strong> {this.state.beer.abv}</span>
                  <span className='modal__beerIndex'><strong>EBC:</strong> {this.state.beer.ebc}</span>
                </div>
                <div className='modal__description'>{this.state.beer.description}</div>
                <div className='modal__foodPairingList'>
                  <div className='modal__foodPairingListTitle'>
                    Best served with:
                </div>
                  <ul >
                    {
                      this.state.beer.food_pairing.map(food => {
                        return <li key={food}>{food}</li>
                      })
                    }

                  </ul>
                </div>
              </div>
            </div>
            <div className='modal__propositions'>
              <strong>
                You might also like:
              </strong>
              <div className='modal__flex'>
                <SimillarBeers
                  beer={this.state.beer}
                  showBeerDetails={this.showBeerDetailsHandler} />
              </div>
            </div>
          </div>
        </Aux >
      )
    }

    return content
  }
}

export default Modal;