import React, { useEffect } from 'react';

import { RestaurantCard } from '../RestaurantCard';

const domainImageURL =
  'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

export const RestaurantList = () => {
  const [topRated, setTopRated] = React.useState(false);
  const [restaurantData, setRestaurantData] = React.useState([]);

  // Function to handle top-rated toggle
  const handleTopRated = () => {
    setTopRated(!topRated);
  };

  // Filtering top-rated restaurants based on toggle state
  const displayedRestaurants = topRated
    ? restaurantData.filter((restaurant) => restaurant.rating >= 4.5)
    : restaurantData;

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
      );
      const responseData = await response.json();
      const restaurants =
        responseData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map(
          (restaurant) => ({
            resName: restaurant.info.name,
            address: `${restaurant.info.locality}, ${restaurant.info.areaName}`,
            cuisine: restaurant.info.cuisines.join(', '),
            rating: restaurant.info.avgRating,
            time: restaurant.info.sla.slaString,
            price: `${restaurant.info.costForTwo}`,
            image: `${domainImageURL}${restaurant.info.cloudinaryImageId}`,
          })
        );
      setRestaurantData(restaurants);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    return () => {
      console.log('RestaurantList component unmounted');
    };
  }, []);

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
            price={restaurant.price}
          />
        ))}
      </div>
    </div>
  );
};
