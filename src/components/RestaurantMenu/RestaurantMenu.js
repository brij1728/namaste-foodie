import './RestaurantMenu.css'; // Import the improved CSS file

import React, { useEffect, useState } from 'react';

import { MENUAPIURL } from '../../constants/apiURL';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { domainImageURL } from '../../constants/apiURL';

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
    restaurantMenuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards[1]?.card?.card?.itemCards || [];

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
            <li key={item.card.info.id} className="menu-item">
              <div className="menu-item-content">
                <h3>{item.card.info.name}</h3>
                <p className="price">₹{item.card.info.price / 100}</p>
                <p>{item.card.info.description}</p>
                <p className="customisable-label">Customisable</p>
              </div>
              <div className='menu-button'>
                <img
                  src={`${domainImageURL}/${item.card.info.imageId}`}
                  alt={item.card.info.name}
                  className="menu-item-image"
                />
                <button className="add-button">ADD</button>
              </div>
            </li>
          ))
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
};
