export default async function handler(req, res) {
  try {
    const swiggyAPIURL = process.env.SWIGGY_API_URL; // Use the environment variable

    // Fetch restaurant data from Swiggy's API
    const response = await fetch(swiggyAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://www.swiggy.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
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
