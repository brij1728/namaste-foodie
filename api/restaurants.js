export default async function handler(req, res) {
  try {
    const swiggyAPIURL =
      '/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

    // Fetch restaurant data from Swiggy's API
    const response = await fetch(swiggyAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add more headers if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching restaurants, status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Send the data to the frontend
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
}
