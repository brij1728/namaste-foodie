// RestaurantList.test.js
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
  it('should handle an empty restaurant array from the API and cover lines 31 and 32', async () => {
    // Mock the API call to return an empty array
    fetchRestaurantsAPI.mockResolvedValue([]);

    await renderRestaurantList();

    // Verify that the state is set to an empty array and the "No restaurants found" message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('no-restaurants-message')).toBeInTheDocument();
    });
  });

  it('should handle empty search results and cover line 46', async () => {
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    // Simulate search results returning an empty array
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    // Wait for the component to update and display the "No restaurants found" message
    await waitFor(() => {
      expect(screen.getByTestId('no-restaurants-message')).toBeInTheDocument();
    });

    // This covers the empty array assignment in line 46
  });

  it('should render RestaurantWithDiscount when discount is present', async () => {
    // Mock the API call to return sample data with a discount
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    // Verify that the RestaurantWithDiscount component is rendered
    const discountedRestaurantCard = screen.getAllByTestId('restaurantCard')[0];
    expect(discountedRestaurantCard).toHaveTextContent('10% OFF');
  });

  it('should toggle top-rated filter when the button is clicked', async () => {
    fetchRestaurantsAPI.mockResolvedValue(sampleRestaurants);

    await renderRestaurantList();

    const toggleButton = screen.getByTestId('top-rated-button');

    // Initially, all restaurants should be displayed
    expect(screen.getAllByTestId('restaurantCard').length).toBe(3);

    // Click the button to show top-rated restaurants
    fireEvent.click(toggleButton);

    // Verify that only restaurants with a rating of 4.5 or higher are displayed
    const restaurantLinks = screen.getAllByTestId('restaurantCard');
    expect(restaurantLinks.length).toBe(2);
    expect(restaurantLinks[0]).toHaveTextContent('Restaurant 1');
    expect(restaurantLinks[1]).toHaveTextContent('Restaurant 3');

    // Click again to show all restaurants
    fireEvent.click(toggleButton);

    // Verify that all restaurants are displayed again
    expect(screen.getAllByTestId('restaurantCard').length).toBe(3);
  });

  it('should show loading shimmers and handle error state', async () => {
    // Mock the API call to simulate a failure
    fetchRestaurantsAPI.mockRejectedValue(new Error('Failed to fetch'));

    // Render the component without waiting for the promise to resolve
    render(
      <BrowserRouter>
        <RestaurantList />
      </BrowserRouter>
    );

    // Verify that the loading shimmer is displayed initially
    expect(screen.getAllByTestId('shimmer-card').length).toBe(12);

    // Wait for the error state to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
