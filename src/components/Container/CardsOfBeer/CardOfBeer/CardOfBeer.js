import React from 'react';

import './CardOfBeer.css';

const cardOfBeer = props => {
  let blockStyle = 'cardOfBeer';
  let imgkStyle = 'cardOfBeer__img';
  let nameStyle = 'cardOfBeer__name';
  let taglinekStyle = 'cardOfBeer__tagline';

  if (props.simillarBeers) {
    blockStyle = 'simillarBeers';
    imgkStyle = 'simillarBeers__img'
    nameStyle = 'simillarBeers__name'
    taglinekStyle = 'simillarBeers__tagline'
  }

  return (
    <div onClick={props.clicked} className={blockStyle} >
      <img className={imgkStyle} src={props.img} alt={props.name} />
      <h2 className={nameStyle}>{props.name}</h2>
      <h5 className={taglinekStyle}>{props.tagline}</h5>
    </div>
  )
}
export default cardOfBeer;