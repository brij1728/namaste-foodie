const express = require('express');
const cors = require('cors'); // Import CORS middleware
const fetch = require('node-fetch'); // Node.js Fetch for external API requests
const https = require('https'); // Import https for custom agent
const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Create an agent that disables SSL certificate verification for development only
const devAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL verification in development
});

// API route to fetch restaurant data from an external API (like Swiggy)
app.get('/api/restaurants', async (req, res) => {
  try {
    const swiggyAPIURL =
      process.env.SWIGGY_API_URL ||
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

    // Conditionally use the devAgent only in development
    const agent = process.env.NODE_ENV === 'development' ? devAgent : undefined;

    const response = await fetch(swiggyAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://www.swiggy.com', // Optional, depending on the API
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
      agent, // Use the devAgent only in development
    });

    // Handle response errors (e.g., 404, 500 from Swiggy)
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      return res.status(response.status).json({
        message: `Error fetching data from Swiggy, status: ${response.status}`,
      });
    }

    const data = await response.json();

    // If Swiggy API returned invalid or unexpected data
    if (!data || !data.data || !data.data.cards) {
      throw new Error('Invalid data structure received from Swiggy');
    }

    // Respond with the fetched data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching restaurants from external API:', error);

    // Differentiate between network/API errors and internal server errors
    if (error.name === 'FetchError') {
      res.status(502).json({ message: 'Error connecting to external API' });
    } else {
      res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
