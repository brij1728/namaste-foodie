const fetch = require('node-fetch');
const https = require('https'); // Required for custom HTTPS agent

// Controller to fetch restaurant data
exports.fetchRestaurants = async (req, res) => {
  try {
    // Define the Swiggy API URL
    const swiggyAPIURL =
      process.env.SWIGGY_API_URL ||
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

    // Custom HTTPS agent to bypass SSL certificate verification (for development)
    const agent =
      process.env.NODE_ENV === 'development'
        ? new https.Agent({
            rejectUnauthorized: false, // Disable SSL certificate verification in development
          })
        : undefined;

    // Fetch restaurant data from Swiggy API
    const response = await fetch(swiggyAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://www.swiggy.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
      agent, // Use custom agent only in development
    });

    if (!response.ok) {
      throw new Error(`Error fetching restaurants, status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching restaurants from external API:', error);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};
