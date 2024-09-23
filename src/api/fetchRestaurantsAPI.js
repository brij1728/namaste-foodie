const domainImageURL =
  'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

const proxyURL = 'https://corsproxy.io/?';
const swiggyAPIURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
const proxyAPIURL =
  '/api?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';


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
