import { domainImageURL } from '../constants/apiURL';

export const fetchRestaurantsAPI = async () => {
  try {
    // Fetch restaurants via your serverless function on Vercel
    // Use the environment variable to determine the base URL
    const baseURL = process.env.REACT_APP_API_URL || '';
    const response = await fetch(`${baseURL}/api/restaurants`);
    console.log('response status:', response.status);

    const rawResponse = await response.text();
    console.log('rawResponse:', rawResponse); // Log the entire raw response

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = JSON.parse(rawResponse); // This might fail if rawResponse isn't JSON
    console.log('responseData:', responseData);

    const restaurants =
      responseData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
        (restaurant) => ({
          id: restaurant.info.id,
          resName: restaurant.info.name,
          address: `${restaurant.info.locality}, ${restaurant.info.areaName}`,
          cuisine: restaurant.info.cuisines.join(', '),
          rating: restaurant.info.avgRating,
          time: restaurant.info.sla.slaString,
          price: `${restaurant.info.costForTwo}`,
          image: `${domainImageURL}${restaurant.info.cloudinaryImageId}`,
          discount: restaurant.info.aggregatedDiscountInfoV3
            ? `${restaurant.info.aggregatedDiscountInfoV3.header || ''} ${
                restaurant.info.aggregatedDiscountInfoV3.subHeader || ''
              }`.trim()
            : null,
        })
      );
    console.log('restaurants:', restaurants);

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};
