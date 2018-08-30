import React from 'react';

import CardOfBeer from './CardOfBeer/CardOfBeer';

import './CardsOfBeer.css';

const cardsOfBeer = props => {
  const beers = props.beers;
  let simillarBeers = false;

  if (props.simillarBeers) {
    simillarBeers = true;
  }
  return (
    <div className='cardsOfBeer'>
      {
        beers.map(beer => {
          return <CardOfBeer
            simillarBeers={simillarBeers}
            key={beer.name + beer.image_url}
            img={beer.image_url}
            name={beer.name}
            tagline={beer.tagline}
            clicked={() => props.showDetails(beer.id)} />
        })
      }
    </div>
  )
}

export default cardsOfBeer;