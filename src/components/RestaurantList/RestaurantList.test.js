import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { RestaurantList } from './RestaurantList';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';
import { restaurantList } from '../../data/restaurantList';

// Mock the API call
jest.mock('../../api/fetchRestaurantsAPI');

it('Should render the RestaurantList Component with Search and Top Rated Button', async () => {
  // Mock the API response
  fetchRestaurantsAPI.mockResolvedValue(restaurantList);

  // Render the RestaurantList component to jsdom
  await act(async () => {
    render(
      <BrowserRouter>
        <RestaurantList />
      </BrowserRouter>
    );
  });

  // Assert that the search input is present (instead of a search button)
  const searchInput = screen.getByPlaceholderText('Search for restaurants...');
  expect(searchInput).toBeInTheDocument();

  // Assert that the Top Rated button is present
  const topRatedButton = screen.getByRole('button', {
    name: 'Show Top Rated Restaurants',
  });
  expect(topRatedButton).toBeInTheDocument();
});
