const domainImageURL =
  'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

// Swiggy API URL for fetching menu by restaurant ID
const MENU_API_BASE_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=`;

/**
 * Fetches restaurant menu data by restaurant ID and formats it into reusable data.
 * @param {string} restaurantId - The unique ID of the restaurant.
 * @returns {Object} Formatted restaurant menu data.
 */
export const fetchRestaurantMenuAPI = async (restaurantId) => {
  const menuAPIURL = `${MENU_API_BASE_URL}${restaurantId}&catalog_qa=undefined&query=Pizza&submitAction=ENTER`;

  try {
    const response = await fetch(menuAPIURL);

    const rawResponse = await response.text();
    // Validate response before parsing
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = JSON.parse(rawResponse);

    // Extract and format the menu information
    const restaurantInfo = responseData?.data?.cards[2]?.card?.card?.info || {};
    const menuItems =
      responseData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(
        (card) => {
          const itemInfo = card?.card?.card?.itemCards?.map((item) => ({
            id: item.card.info.id,
            name: item.card.info.name,
            price: item.card.info.price / 100, // Price in rupees (assuming it's in paise)
            description: item.card.info.description,
            image: item.card.info.imageId
              ? `${domainImageURL}${item.card.info.imageId}`
              : null, // Use image if available
          }));
          return itemInfo || [];
        }
      );

    return {
      restaurantName: restaurantInfo.name,
      cuisines: restaurantInfo.cuisines.join(', '),
      costForTwo: restaurantInfo.costForTwoMessage,
      menuItems: menuItems.flat(), // Flatten the array for easy mapping
    };
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    return {};
  }
};
