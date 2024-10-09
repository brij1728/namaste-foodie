import './ShimmerRestaurantCard.css';

import React from 'react';

export const ShimmerRestaurantCard = () => {
  return (
    <div data-testid="shimmer-card" className="restaurant-card shimmer-wrapper">
      <div className="image-container shimmer"></div>
      <div className="card-content">
        <div className="shimmer-title shimmer"></div>
        <div className="shimmer-text shimmer"></div>
        <div className="shimmer-text shimmer"></div>
        <div className="shimmer-address shimmer"></div>
      </div>
    </div>
  );
};
