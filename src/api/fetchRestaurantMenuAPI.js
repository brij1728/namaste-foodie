export const fetchRestaurantMenuAPI = async (restaurantId) => {
  try {
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000' // Local development API
        : process.env.REACT_APP_API_URL ||
          'https://namaste-react-foodie.vercel.app/'; // Production URL

    // console.log(
    //   `Fetching menu for restaurantId: ${restaurantId} from ${baseURL}/api/restaurantMenu`
    // );

    // Fetch the menu data from your serverless function
    const response = await fetch(
      `${baseURL}/api/restaurantMenu?restaurantId=${restaurantId}`
    );

    // Check for errors
    if (!response.ok) {
      console.error(`Failed to fetch menu data. Status: ${response.status}`);
      throw new Error(`Failed to fetch restaurant menu data`);
    }

    // Parse the menu data
    const responseMenu = await response.json();
    //console.log('Fetched menu:', responseMenu);

    return responseMenu;
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    throw error; // Handle error appropriately
  }
};
