export const fetchRestaurantMenuAPI = async (restaurantId) => {
  try {
    // Determine the base URL: use localhost for development, Vercel URL for production
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000' // Local development API
        : process.env.REACT_APP_API_URL ||
          'https://namaste-react-neon-eta.vercel.app'; // Production URL

    console.log(
      `Fetching menu for restaurantId: ${restaurantId} from ${baseURL}/api/restaurantMenu`
    );

    // Fetch restaurant menu via your serverless function on Vercel or local dev API
    const response = await fetch(
      `${baseURL}/api/restaurantMenu?restaurantId=${restaurantId}`
    );

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant menu data');
    }

    const responseMenu = await response.json();
    console.log('Fetched menu:', responseMenu);

    return responseMenu;
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    throw error;
  }
};
