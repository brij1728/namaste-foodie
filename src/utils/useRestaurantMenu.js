import { useEffect, useState } from 'react';

import { MENUAPIURL } from '../constants/apiURL';
import { fetchRestaurantMenuAPI } from '../api/fetchRestaurantMenuAPI';

export const useRestaurantMenu = (restaurantId) => {
  const [restaurantMenuInfo, setRestaurantMenuInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const loadMenuData = async () => {
    try {
      const menuData = await fetchRestaurantMenuAPI(restaurantId, MENUAPIURL);
      setRestaurantMenuInfo(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    
    if (restaurantId) {
      loadMenuData(); 
    }
  }, [restaurantId]);

  return { restaurantMenuInfo, loading };
};
