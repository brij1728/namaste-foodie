import '@testing-library/jest-dom';

import { DiscountedRestaurantCard, RestaurantCard } from './RestaurantCard';
import { render, screen } from '@testing-library/react';

import restarantCardMock from '../../data/restaurantCard.json';

it('Should render RestaurantCard Component with props data', () => {
  // Render the RestaurantCard component to jsdom
  render(<RestaurantCard {...restarantCardMock} />);

  const name = screen.getByText(restarantCardMock.resName);
  const ratingAndTime = screen.getByText((content, element) => {
    return content.includes(
      `${restarantCardMock.rating} • ${restarantCardMock.time}`
    );
  });
  const cuisine = screen.getByText(restarantCardMock.cuisine);
  const address = screen.getByText(restarantCardMock.address);

  expect(name).toBeInTheDocument();
  expect(ratingAndTime).toBeInTheDocument();
  expect(cuisine).toBeInTheDocument();
  expect(address).toBeInTheDocument();
});

it('Should render RestaurantCard Component with discount label', () => {
  
  // Render the DiscountedRestaurantCard component to jsdom
  const DiscountedRestaurant = DiscountedRestaurantCard(RestaurantCard);
  render(<DiscountedRestaurant {...restarantCardMock} />);

  const discount = screen.getByText(restarantCardMock.discount);

  expect(discount).toBeInTheDocument();
});
