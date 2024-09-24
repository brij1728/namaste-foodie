import './RestaurantMenu.css';

import React, { useEffect, useState } from 'react';

import { MENUAPIURL } from '../../constants/apiURL';
import { ShimmerRestaurantCard } from '../ShimmerRestaurantCard';
import { domainImageURL } from '../../constants/apiURL';
import { fetchRestaurantMenuAPI } from '../../api/fetchRestaurantMenuAPI';
import { useParams } from 'react-router-dom';

export const RestaurantMenu = () => {
  const [restaurantMenuInfo, setRestaurantMenuInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { restaurantId } = useParams();
  console.log('Restaurant ID:', restaurantId);

  const loadMenuData = async () => {
    try {
      const menuData = await fetchRestaurantMenuAPI(restaurantId, MENUAPIURL);
      console.log('Menu Response:', menuData);
      setRestaurantMenuInfo(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      loadMenuData(); // Load menu data if restaurantId is available
    }
  }, []);

  if (loading) {
    return <ShimmerRestaurantCard />;
  }

  const restaurantData = restaurantMenuInfo?.data?.cards[2]?.card?.card?.info;
  console.log('Restaurant Data:', restaurantData);

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
     ?.cards?.[2]?.card?.card?.itemCards ||
   restaurantMenuInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
     ?.cards?.[1]?.card?.card?.itemCards ||
   [];
 console.log('Menu Items:', menuItems);

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
                <p className="price">
                  ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
                </p>
                <p>{item.card.info.description}</p>
              </div>
              <div className="menu-button">
                <img
                  src={`${domainImageURL}/${item.card.info.imageId}`}
                  alt={item.card.info.name}
                  className="menu-item-image"
                />
                <button className="add-button">ADD</button>
                <p className="customisable-label">Customisable</p>
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
