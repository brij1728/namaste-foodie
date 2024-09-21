import './RestaurantCard.css';

import { FaStar } from 'react-icons/fa';
import React from 'react';

export const RestaurantCard = (props) => {
  return (
    <div className="restaurant-card">
      <div className="image-container">
        <img src={props.image} alt={props.resName} className="restaurant-img" />
        <div className="overlay">
          <p className="price-text">{props.price}</p>
        </div>
      </div>
      <div className="card-content">
        <p className="card-title">{props.resName}</p>
        <p className="card-rating">
          <FaStar className="rating-star" /> {props.rating} • {props.time}
        </p>
        <p className="card-cuisine">{props.cuisine}</p>
        <p className="card-address">{props.address}</p>
      </div>
    </div>
  );
};
