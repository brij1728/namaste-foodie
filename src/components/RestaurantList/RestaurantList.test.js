import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { RestaurantList } from './RestaurantList';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';

// Mock the API call
jest.mock('../../api/fetchRestaurantsAPI');

// Suppress warnings in tests
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Restore console error after all tests
afterAll(() => {
  console.error.mockRestore();
});

const sampleRestaurants = [
  {
    id: 1,
    resName: 'Restaurant 1',
    rating: 4.5,
    time: '30 mins',
    image: '',
    address: '',
    cuisine: '',
    discount: '10% OFF',
  },
  {
    id: 2,
    resName: 'Restaurant 2',
    rating: 4.2,
    time: '25 mins',
    image: '',
    address: '',
    cuisine: '',
  },
  {
    id: 3,
    resName: 'Restaurant 3',
    rating: 4.6,
    time: '20 mins',
    image: '',
    address: '',
    cuisine: '',
  },
];

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
  it('should handle loading and error states correctly', async () => {
    // Mock the API call to fail
    fetchRestaurantsAPI.mockImplementation(() => {
      // Simulate a delay to allow the component to show the loading state
      return new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API Error')), 100)
      );
    });

    await renderRestaurantList();

    // Verify that the loading shimmer is displayed initially
    expect(screen.getAllByTestId('shimmer-card').length).toBe(12);

    // Verify that the error message is displayed after the loading state
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('should render restaurants and toggle top-rated filter', async () => {
    // Mock the API call to return sample data
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    // Verify that all restaurants are displayed initially
    const restaurantLinks = screen.getAllByTestId('restaurantCard');
    expect(restaurantLinks.length).toBe(3);

    // Click the top-rated filter button
    const toggleButton = screen.getByTestId('top-rated-button');
    fireEvent.click(toggleButton);

    // Verify that only the top-rated restaurant is shown
    await waitFor(() => {
      const filteredRestaurantLinks = screen.getAllByTestId('restaurantCard');
      expect(filteredRestaurantLinks.length).toBe(2);
      expect(filteredRestaurantLinks[0]).toHaveTextContent('Restaurant 1');
      expect(filteredRestaurantLinks[1]).toHaveTextContent('Restaurant 3');
    });

    // Click again to show all restaurants
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getAllByTestId('restaurantCard').length).toBe(3);
    });
  });

  it('should handle search and filter results correctly', async () => {
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    // Search for a restaurant
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Restaurant 1' } });

    // Verify that only matching restaurant is displayed
    await waitFor(() => {
      const restaurantLinks = screen.getAllByTestId('restaurantCard');
      expect(restaurantLinks.length).toBe(1);
      expect(restaurantLinks[0]).toHaveTextContent('Restaurant 1');
    });

    // Clear the search input
    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getAllByTestId('restaurantCard').length).toBe(3);
    });
  });

  it('should display "No restaurants found" message when no results match search', async () => {
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    // Search for a non-existent restaurant
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, {
      target: { value: 'Non-existent Restaurant' },
    });

    // Verify that "No restaurants found" message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('no-restaurants-message')).toBeInTheDocument();
    });
  });
});
