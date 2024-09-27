import './RestaurantMenu.css';

import { MenuItemCard } from '../MenuItemCard';
import React from 'react';
import { RestaurantCategory } from '../RestaurantCategory';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { useParams } from 'react-router-dom';
import { useRestaurantMenu } from '../../utils';

export const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const { restaurantMenuInfo, loading } = useRestaurantMenu(restaurantId);

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


  const category =
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) =>
        card.card?.['card']?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    ) || [];

  console.log('category', category);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>{name}</h1>
        <h2>Cuisines: {cuisines.join(', ')}</h2>
        <p>Cost for two: {costForTwoMessage}</p>
        <p>Rating: {avgRating}</p>
      </div>

      <ul className="" style={{ backgroundColor: 'gba(2, 6, 12, .0509803922)'}}>

        {category.length > 0 ? (
          category.map((item) => {
            const category = item.card.card.title;
            const items = item.card.card.itemCards;

            return (
              <RestaurantCategory
                key={item.card.card.title}
                title={category}
                item={items}
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
