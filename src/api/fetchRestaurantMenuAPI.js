export const fetchRestaurantMenuAPI = async (restaurantId) => {
  try {
    // Fetch restaurant menu via your serverless function on Vercel
    const response = await fetch(
      `/api/restaurantMenu?restaurantId=${restaurantId}`
    );

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
