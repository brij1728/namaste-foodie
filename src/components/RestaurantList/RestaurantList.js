import './RestaurantList.css';

import React, { useEffect, useState } from 'react';

import { RestaurantCard } from '../RestaurantCard';
import { RestaurantSearch } from '../RestaurantSearch'; // Import the search component
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';

const domainImageURL =
  'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

export const RestaurantList = () => {
  const [topRated, setTopRated] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // To handle filtered data by search
  const [loading, setLoading] = useState(true);

  // Function to handle top-rated toggle
  const handleTopRated = () => {
    setTopRated(!topRated);
  };

  // Filtering top-rated restaurants based on toggle state
  const displayedRestaurants = topRated
    ? filteredData.filter((restaurant) => restaurant.rating >= 4.5)
    : filteredData;

  const fetchRestaurants = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
      );
      const responseData = await response.json();
      const restaurants =
        responseData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
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
      setFilteredData(restaurants); // Initially, filtered data is the same as restaurantData
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Fetch restaurant data on mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Update filtered data when search results are provided
  const handleSearchResults = (results) => {
    setFilteredData(results);
  };

  // Number of shimmer cards to display while loading
  const shimmerCards = new Array(8).fill(0);

  return (
    <div className="restaurant-list-container">
      <RestaurantSearch
        restaurantData={restaurantData}
        onSearchResults={handleSearchResults} // Pass the callback to search component
      />

      <button className="top-rated-button" onClick={handleTopRated}>
        {topRated ? 'Show All Restaurants' : 'Show Top Rated Restaurants'}
      </button>

      <div className="restaurant-container">
        {loading || filteredData.length === 0 // Check if loading or data is not loaded
          ? shimmerCards.map((_, index) => (
              <ShimmerRestaurantCard key={index} />
            )) // Show shimmer cards while loading
          : displayedRestaurants.map((restaurant, index) => (
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
