export default async function handler(req, res) {
  const { restaurantId } = req.query; // Extract restaurant ID from the query params
  try {
    const MENUAPIURL = `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=`;
    const response = await fetch(`${MENUAPIURL}${restaurantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant menu data');
    }

    const responseMenu = await response.json();
    res.status(200).json(responseMenu);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ message: 'Failed to fetch restaurant menu' });
  }
}
