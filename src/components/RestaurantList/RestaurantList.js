// RestaurantList.js
import './RestaurantList.css';

import { DiscountedRestaurantCard, RestaurantCard } from '../RestaurantCard';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { RestaurantSearch } from '../RestaurantSearch';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';

export const RestaurantList = () => {
  const [topRated, setTopRated] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredRestaurantData, setFilteredRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const RestaurantWithDiscount = DiscountedRestaurantCard(RestaurantCard);

  const handleTopRated = () => {
    setTopRated(!topRated);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(false);
        const restaurants = await fetchRestaurantsAPI();
        setRestaurantData(restaurants || []);
        setFilteredRestaurantData(restaurants || []);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        setError(true);
        setRestaurantData([]);
        setFilteredRestaurantData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSearchResults = (results) => {
    setFilteredRestaurantData(results || []);
  };

  const displayedRestaurants = topRated
    ? filteredRestaurantData.filter((restaurant) => restaurant?.rating >= 4.5)
    : filteredRestaurantData;

  const shimmerCards = new Array(12).fill(0);

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list-header">
        <div className="restaurant-search">
          <RestaurantSearch
            restaurantData={restaurantData}
            onSearchResults={handleSearchResults}
            data-testid="search-input"
          />
        </div>
        <div className="top-rated-button-container">
          <button
            className="top-rated-button"
            onClick={handleTopRated}
            data-testid="top-rated-button"
          >
            {topRated ? 'Show All Restaurants' : 'Show Top Rated Restaurants'}
          </button>
        </div>
      </div>
      <div className="restaurant-container">
        {loading ? (
          shimmerCards.map((_, index) => (
            <ShimmerRestaurantCard key={index} data-testid="shimmer-card" />
          ))
        ) : error ? (
          <p data-testid="error-message">
            Failed to fetch restaurants. Please try again later.
          </p>
        ) : displayedRestaurants.length === 0 ? (
          <p data-testid="no-restaurants-message">No restaurants found.</p>
        ) : (
          displayedRestaurants.map((restaurant) => (
            <Link
              key={restaurant?.id}
              to={`/restaurants/${restaurant.id}`}
              data-testid="restaurantCard"
            >
              {restaurant.discount ? (
                <RestaurantWithDiscount {...restaurant} />
              ) : (
                <RestaurantCard {...restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
