import { domainImageURL } from '../constants/apiURL';

export const fetchRestaurantsAPI = async () => {
  try {
    // Determine the base URL: use relative for development (since Parcel runs on the same port)
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000' // Use relative URL in development (Parcel is running on localhost:1234)
        : process.env.REACT_APP_API_URL ||
          'https://namaste-react-neon-eta.vercel.app'; // Production URL

    // Fetch restaurants via your serverless function on Vercel or local dev API
    const response = await fetch(`${baseURL}/api/restaurants`);
    console.log('response status:', response.status);
    console.log('Fetching from URL:', `${baseURL}/api/restaurants`);


    const rawResponse = await response.text();
    console.log('rawResponse:', rawResponse); // Log the entire raw response

    // Handle the case where the response is not successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    let responseData;
    try {
      responseData = JSON.parse(rawResponse); // This might fail if rawResponse isn't JSON
      console.log('responseData:', responseData);
    } catch (error) {
      throw new Error('Error parsing JSON from response');
    }

    // Process the restaurants data
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
