const express = require('express');
const app = express();
const port = 5000; // You can change the port if necessary

// Mock data for restaurants (replace this with your actual mock data)
const mockData = {
  data: {
    cards: [
      {},
      {
        card: {
          card: {
            gridElements: {
              infoWithStyle: {
                restaurants: [
                  {
                    info: {
                      id: '123',
                      name: 'Test Restaurant',
                      locality: 'Locality 1',
                      areaName: 'Area 1',
                      cuisines: ['Cuisine 1', 'Cuisine 2'],
                      avgRating: 4.5,
                      sla: { slaString: '30 mins' },
                      costForTwo: '300',
                      cloudinaryImageId: 'test_image',
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ],
  },
};

// API endpoint for fetching restaurants
app.get('/api/restaurants', (req, res) => {
  res.json(mockData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
