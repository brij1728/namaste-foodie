export const fetchRestaurantMenuAPI = async (restaurantId, MENUAPIURL) => {
  try {
    const response = await fetch(`${MENUAPIURL}${restaurantId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant menu data');
    }

    const responseMenu = await response.json();
    return responseMenu;
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    throw error;
  }
};
