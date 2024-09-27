import './RestaurantCard.css';

import { FaStar } from 'react-icons/fa';
import React from 'react';

export const RestaurantCard = (props) => {
  return (
    <div className="restaurant-card shadow-lg rounded-lg transition-transform transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={props.image}
          alt={props.resName}
          className="restaurant-img rounded-t-lg object-cover"
        />
        {props.discount && (
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2 text-lg font-bold">
            {props.discount}
          </div>
        )}
      </div>
      <div className="card-content p-4">
        <p className="card-title font-semibold text-gray-900">
          {props.resName}
        </p>
        <p className="card-rating text-gray-600 text-sm flex items-center">
          <FaStar className="text-green-500 mr-1" /> {props.rating} •{' '}
          {props.time}
        </p>
        <p className="card-cuisine text-gray-500 text-sm truncate">
          {props.cuisine}
        </p>
        <p className="card-address text-gray-400 text-xs">{props.address}</p>
      </div>
    </div>
  );
};

// Higher Order Component to add Discount Label
export const DiscountedRestaurantCard = (RestaurantCard) => {
  return (props) => (
    <div>
      {/* <label>Discounted Restaurant Card</label> */}
      <RestaurantCard {...props} />
    </div>
  );
};
