import { domainImageURL, swiggyAPIURL } from '../constants/apiURL';

export const fetchRestaurantsAPI = async () => {
  try {
   
    const response = await fetch(`${swiggyAPIURL}`);

    const rawResponse = await response.text();
    // console.log('Raw response:', rawResponse);

    // Check if response is valid before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = JSON.parse(rawResponse); // Manually parsing to catch errors

    const restaurants = responseData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
      (restaurant) => ({
        id: restaurant.info.id,
        resName: restaurant.info.name,
        address: `${restaurant.info.locality}, ${restaurant.info.areaName}`,
        cuisine: restaurant.info.cuisines.join(', '),
        rating: restaurant.info.avgRating,
        time: restaurant.info.sla.slaString,
        price: `${restaurant.info.costForTwo}`,
        image: `${domainImageURL}${restaurant.info.cloudinaryImageId}`,
      })
    );

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};
