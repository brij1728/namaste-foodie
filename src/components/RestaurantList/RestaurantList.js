import React from 'react';
import { RestaurantCard } from '../RestaurantCard';
export const RestaurantList = ({restaurants}) => {
  return (
    <div className="restaurant-container">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard
          key={index}
          resName={restaurant.resName}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          time={restaurant.time}
          address={restaurant.address}
          image={restaurant.image}
        />
      ))}
    </div>
  );
};
