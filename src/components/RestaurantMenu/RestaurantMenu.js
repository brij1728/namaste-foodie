import './RestaurantMenu.css';

import React, { useState } from 'react';

import { RestaurantCategory } from '../RestaurantCategory';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { useParams } from 'react-router-dom';
import { useRestaurantMenu } from '../../utils';

export const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const { restaurantMenuInfo, loading } = useRestaurantMenu(restaurantId);
  const [openCategoryIndex, setOpenCategoryIndex] = useState(0); 

  const handleToggle = (index) => {
    // If the clicked category is already open, close it (set to null)
    // Otherwise, open the clicked category
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  if (loading) {
    return <ShimmerRestaurantCard />;
  }

  const restaurantData = restaurantMenuInfo?.data?.cards[2]?.card?.card?.info;

  if (!restaurantData) {
    return <p>No data available</p>;
  }

  const {
    name = 'Restaurant',
    cuisines = [],
    costForTwoMessage = '',
    avgRating = '',
  } = restaurantData;

  const categories =
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) =>
        card.card?.['card']?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    ) || [];

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>{name}</h1>
        <h2>Cuisines: {cuisines.join(', ')}</h2>
        <p>Cost for two: {costForTwoMessage}</p>
        <p>Rating: {avgRating}</p>
      </div>

      <ul>
        {categories.length > 0 ? (
          categories.map((item, index) => {
            const categoryTitle = item.card.card.title;
            const items = item.card.card.itemCards;

            return (
              <RestaurantCategory
                key={categoryTitle}
                title={categoryTitle}
                item={items}
                isOpen={index === openCategoryIndex} 
                onToggle={() => handleToggle(index)} 
              />
            );
          })
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
};
