const fetch = require('node-fetch');
const https = require('https');

// Controller to fetch restaurant menu data
exports.fetchRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.query;

    if (!restaurantId) {
      return res.status(400).json({ message: 'Missing restaurantId in query' });
    }

    // Construct the API URL
    const swiggyMenuAPIURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${restaurantId}`;

    // Custom HTTPS agent to disable SSL verification in development
    const agent =
      process.env.NODE_ENV === 'development'
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

    // Fetch restaurant menu data from Swiggy API
    const response = await fetch(swiggyMenuAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://www.swiggy.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
      agent,
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch menu for restaurantId ${restaurantId}, status: ${response.status}`
      );
      throw new Error(
        `Error fetching restaurant menu, status: ${response.status}`
      );
    }

    const menuData = await response.json();
    res.status(200).json(menuData); // Send the menu data to the frontend
  } catch (error) {
    console.error('Error fetching restaurant menu from external API:', error);
    res.status(500).json({ message: 'Failed to fetch restaurant menu' });
  }
};
