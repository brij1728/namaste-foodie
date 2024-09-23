import axios from 'axios';

const fetchRestaurantsHandler = async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.swiggy.com/dapi/restaurants/list/v5',
      {
        params: {
          lat: '12.9715987',
          lng: '77.5945627',
          'is-seo-homepage-enabled': true,
          page_type: 'DESKTOP_WEB_LISTING',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

export default fetchRestaurantsHandler;
