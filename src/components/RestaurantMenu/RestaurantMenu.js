import React, { useEffect, useState } from 'react';

import { MENUAPIURL } from '../../constants/apiURL';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';

export const RestaurantMenu = () => {
  const [restaurantMenuInfo, setRestaurantMenuInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENUAPIURL);
      const responseMenu = await response.json();
      console.log(responseMenu);
      setRestaurantMenuInfo(responseMenu);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  
  if (loading) {
    return <ShimmerRestaurantCard />;
  }

  // Check if restaurantMenuInfo has the expected structure
  const restaurantData = restaurantMenuInfo?.data?.cards[2]?.card?.card?.info;
  if (!restaurantData) {
    return <p>No data available</p>; // Handle case when data is not available
  }

  // Destructure data safely with a fallback
  const {
    name = 'Restaurant',
    cuisines = [],
    costForTwoMessage = '',
    avgRating = '',
  } = restaurantData;

  const menuItems =
    restaurantMenuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards[1]?.card?.card?.itemCards || [];
  console.log(menuItems);

  return (
    <div>
      <h1>{name}</h1>
      <h2>Cuisines: {cuisines.join(', ')}</h2>
      <p>Cost for two: {costForTwoMessage}</p>
      <p>Rating: {avgRating}</p>
      <h2>Menu</h2>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - ₹{item.card.info.price / 100}
            </li>
          ))
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
};
