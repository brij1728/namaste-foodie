export default async function handler(req, res) {
  try {
    const { restaurantId } = req.query; // Extract the restaurantId from query parameters

    if (!restaurantId) {
      return res.status(400).json({ message: 'Missing restaurantId in query' });
    }

    // Use the environment variable or default API URL
    const swiggyMenuAPIURL =
      process.env.SWIGGY_MENU_API_URL ||
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${restaurantId}`;

    // Fetch restaurant menu data from Swiggy API
    const response = await fetch(swiggyMenuAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://www.swiggy.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching restaurant menu, status: ${response.status}`
      );
    }

    const menuData = await response.json();

    // Respond with the restaurant menu data
    res.status(200).json(menuData);
  } catch (error) {
    console.error('Error in serverless function fetching menu:', error);
    res.status(500).json({ message: 'Failed to fetch restaurant menu' });
  }
}
