export const mockRestaurantData = {
  data: {
    cards: [
      {}, // Extra card in the response before the desired card
      {
        card: {
          card: {
            gridElements: {
              infoWithStyle: {
                restaurants: [
                  {
                    info: {
                      id: 1,
                      name: 'Pizza Place',
                      locality: 'Downtown',
                      areaName: 'City Center',
                      cuisines: ['Italian', 'Pizza'],
                      avgRating: 4.5,
                      sla: { slaString: '30 MINS' },
                      costForTwo: '300',
                      cloudinaryImageId: 'image_id_123',
                      aggregatedDiscountInfoV3: {
                        header: '20% OFF',
                        subHeader: 'on all orders',
                      },
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
