import React from 'react';
import { RestaurantCard } from '../RestaurantCard';

export const RestaurantList = ({ restaurants }) => {
  const [topRated, setTopRated] = React.useState(false);

  // Function to handle top-rated toggle
  const handleTopRated = () => {
    setTopRated(!topRated);
  };

  // Filtering top-rated restaurants based on toggle state
  const displayedRestaurants = topRated
    ? restaurants.filter((restaurant) => restaurant.rating >= 4.5)
    : restaurants;

  return (
    <div>
      <button onClick={handleTopRated}>
        {topRated ? 'Show All Restaurants' : 'Top Rated Restaurants'}
      </button>

      <div className="restaurant-container">
        {displayedRestaurants.map((restaurant, index) => (
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
    </div>
  );
};
