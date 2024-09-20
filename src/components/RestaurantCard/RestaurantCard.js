import './RestaurantCard.css';

import React from 'react';

export const RestaurantCard = (props) => {
  return (
    <div className="restaurant-card">
      <img src={props.image} alt={props.resName} className="restaurant-img" />
      <div className="card-content">
        <p className="card-title">{props.resName}</p>
        <p className="card-cuisine">{props.cuisine}</p>
        <p className="card-rating">
          <span>{props.rating} ★ </span>
          <span>{props.time}</span>
        </p>
        <p className="card-address">{props.address}</p>
        <button className="order-now-button">Order Now</button>
      </div>
    </div>
  );
};
