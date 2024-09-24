import './RestaurantList.css';

import React, { useEffect, useState } from 'react';

import { RestaurantCard } from '../RestaurantCard';
import { RestaurantSearch } from '../RestaurantSearch';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';

export const RestaurantList = () => {
  const [topRated, setTopRated] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredRestaurantData, setFilteredRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggle for top-rated restaurants
  const handleTopRated = () => {
    setTopRated(!topRated);
  };

  // Fetch restaurant data on mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurants = await fetchRestaurantsAPI();
        setRestaurantData(restaurants || []); // Ensure an empty array if the API response is null/undefined
        setFilteredRestaurantData(restaurants || []); // Ensure an empty array if the API response is null/undefined
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        setRestaurantData([]); // Fallback to an empty array in case of error
        setFilteredRestaurantData([]); // Fallback to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle search result updates
  const handleSearchResults = (results) => {
    setFilteredRestaurantData(results || []); // Ensure an empty array if the search results are null/undefined
  };

  const displayedRestaurants = topRated
    ? filteredRestaurantData.filter((restaurant) => restaurant?.rating >= 4.5) // Optional chaining for safety
    : filteredRestaurantData;

  // Number of shimmer cards to display while loading
  const shimmerCards = new Array(12).fill(0);

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list-header">
        <div className="restaurant-search">
          <RestaurantSearch
            restaurantData={restaurantData}
            onSearchResults={handleSearchResults}
          />
        </div>
        <div className="top-rated-button-container">
          <button className="top-rated-button" onClick={handleTopRated}>
            {topRated ? 'Show All Restaurants' : 'Show Top Rated Restaurants'}
          </button>
        </div>
      </div>

      <div className="restaurant-container">
        {loading ||
        (Array.isArray(filteredRestaurantData) &&
          filteredRestaurantData.length === 0) // Safeguard added with Array.isArray
          ? shimmerCards.map((_, index) => (
              <ShimmerRestaurantCard key={index} />
            ))
          : displayedRestaurants?.map((restaurant) => (
              <RestaurantCard key={restaurant?.id} {...restaurant} />
            ))}
      </div>
    </div>
  );
};
