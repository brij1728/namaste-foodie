import './RestaurantMenu.css';

import { MenuItemCard } from '../MenuItemCard';
import React from 'react';
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

  const menuItems =
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards?.[1]?.card?.card?.itemCards ||
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards?.[4]?.card?.card?.itemCards ||
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards?.[2]?.card?.card?.itemCards ||
    restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards?.[5]?.card?.card?.itemCards ||
    [];

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>{name}</h1>
        <h2>Cuisines: {cuisines.join(', ')}</h2>
        <p>Cost for two: {costForTwoMessage}</p>
        <p>Rating: {avgRating}</p>
      </div>

      <h2>Menu</h2>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <MenuItemCard key={item.card.info.id} item={item} />
          ))
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
};
