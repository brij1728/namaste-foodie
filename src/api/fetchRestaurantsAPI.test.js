import '@testing-library/jest-dom';

import { domainImageURL, swiggyAPIURL } from '../constants/apiURL';

import fetch from 'jest-fetch-mock';
import { fetchRestaurantsAPI } from './fetchRestaurantsAPI';
import {mockRestaurantData} from '../data/mockRestaurantData';

require('jest-fetch-mock').enableMocks();

describe('fetchRestaurantsAPI', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset mock before each test

    // Suppress console.error for this test file
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should return a list of restaurants on a successful API call', async () => {
    // Mock the fetch response
    fetch.mockResponseOnce(JSON.stringify(mockRestaurantData));

    // Call the fetchRestaurantsAPI function
    const restaurants = await fetchRestaurantsAPI();

    // Check if the returned restaurant data is correct
    expect(restaurants).toEqual([
      {
        id: 1,
        resName: 'Pizza Place',
        address: 'Downtown, City Center',
        cuisine: 'Italian, Pizza',
        rating: 4.5,
        time: '30 MINS',
        price: '300',
        image: `${domainImageURL}image_id_123`, // Ensure this matches the real domainImageURL
        discount: '20% OFF on all orders',
      },
    ]);

    // Ensure fetch was called once with the correct URL
    expect(fetch).toHaveBeenCalledWith(`${swiggyAPIURL}`);
  });

  test('should return an empty array on API failure', async () => {
    // Mock a failed fetch response
    fetch.mockRejectOnce(new Error('Failed to fetch'));

    // Call the fetchRestaurantsAPI function
    const restaurants = await fetchRestaurantsAPI();

    // Expect an empty array on error
    expect(restaurants).toEqual([]);

    // Ensure fetch was called once
    expect(fetch).toHaveBeenCalledWith(`${swiggyAPIURL}`);
  });

  test('should handle invalid response', async () => {
    // Mock an invalid fetch response (status not OK)
    fetch.mockResponseOnce('Invalid response', { status: 500 });

    const restaurants = await fetchRestaurantsAPI();

    // Expect an empty array when the response is not OK
    expect(restaurants).toEqual([]);
  });

  // Additional test for when no restaurants are returned
  test('should return an empty array when restaurants data is missing', async () => {
    // Mock fetch response with no restaurant data
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          cards: [
            {},
            {
              card: {
                card: { gridElements: { infoWithStyle: { restaurants: [] } } },
              },
            },
          ],
        },
      })
    );

    const restaurants = await fetchRestaurantsAPI();

    // Expect an empty array if no restaurants are present in the response
    expect(restaurants).toEqual([]);
  });
});