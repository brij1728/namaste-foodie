import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { RestaurantList } from './RestaurantList';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';
import { restaurantList } from '../../data/restaurantList';

// Mock the API call
jest.mock('../../api/fetchRestaurantsAPI');

// Suppress warnings in tests
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

// Shared setup logic for rendering the component
const renderRestaurantList = async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <RestaurantList />
      </BrowserRouter>
    );
  });
};

describe('RestaurantList Component', () => {
  beforeEach(async () => {
    // Mock API response for each test
    fetchRestaurantsAPI.mockResolvedValue(restaurantList);
    await renderRestaurantList();
  });

  it('should render the search input and top-rated toggle button correctly', async () => {
    // Check if the restaurant cards are loaded initially
    const restaurantCards = screen.getAllByTestId('restaurantCard');
    expect(restaurantCards).toHaveLength(restaurantList.length); // Adjust according to the mock list size

    // Check if the search input is rendered
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    // Check if the top-rated button is rendered
    const topRatedButton = screen.getByRole('button', {
      name: 'Show Top Rated Restaurants',
    });
    expect(topRatedButton).toBeInTheDocument();
  });

  it('should filter the restaurant list correctly based on the search input', async () => {
    const searchInput = screen.getByTestId('search-input');

    // Simulate search input
    fireEvent.change(searchInput, { target: { value: 'Pizza' } });

    // Wait for the results to be filtered
    const filteredCards = screen.getAllByTestId('restaurantCard');
    expect(filteredCards).toHaveLength(3); // Assuming 2 restaurants match the search term 'Pizza'
  });

  it('should filter the restaurant list to show only top-rated restaurants when the top-rated button is clicked', async () => {
    // Check the initial number of restaurant cards
    const initialCards = screen.getAllByTestId('restaurantCard');
    expect(initialCards).toHaveLength(restaurantList.length); // Ensure it matches the API mock data size

    // Click on the "Show Top Rated Restaurants" button
    const topRatedButton = screen.getByRole('button', {
      name: 'Show Top Rated Restaurants',
    });
    fireEvent.click(topRatedButton);

    // Check if only the top-rated restaurants are displayed
    const topRatedCards = screen.getAllByTestId('restaurantCard');
    expect(topRatedCards).toHaveLength(7); // Assuming 6 restaurants are top-rated (rating >= 4.5)
  });
});
