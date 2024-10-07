import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RestaurantSearch } from './RestaurantSearch';
import { restaurantList } from '../../data/restaurantList';

describe('RestaurantSearch Component', () => {
  //test for the input field
  test('should render the input field', () => {
    render(
      <RestaurantSearch
        restaurantData={restaurantList}
        onSearchResults={() => {}}
      />
    );

    // Check if the input field is rendered
    const inputElement = screen.getByPlaceholderText(
      'Search for restaurants...'
    );
    expect(inputElement).toBeInTheDocument();
  });

  //test for the search results
  test('should filter restaurants based on search input', async () => {
    const mockOnSearchResults = jest.fn();

    render(
      <RestaurantSearch
        restaurantData={restaurantList}
        onSearchResults={mockOnSearchResults}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Search for restaurants...'
    );

    // Simulate typing into the search input
    fireEvent.change(inputElement, { target: { value: 'Pizza' } });

    // Check that the filtered results are displayed
    await waitFor(() => {
      expect(screen.getByText('Pizza Hut')).toBeInTheDocument();
      expect(screen.getByText("Domino's Pizza")).toBeInTheDocument();
    });

    // Ensure that non-matching restaurants are not displayed
    expect(screen.queryByText('Burger King')).not.toBeInTheDocument();

    // Check that onSearchResults is called with the filtered data
    expect(mockOnSearchResults).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ resName: 'Pizza Hut' }),
        expect.objectContaining({ resName: "Domino's Pizza" }),
      ])
    );
  });

  //test for the no results found
  test('should show "No restaurants found" when no results match', async () => {
    const mockOnSearchResults = jest.fn();

    render(
      <RestaurantSearch
        restaurantData={restaurantList}
        onSearchResults={mockOnSearchResults}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Search for restaurants...'
    );

    // Simulate typing a non-matching string
    fireEvent.change(inputElement, {
      target: { value: 'NonExistentRestaurant' },
    });

    // Check that the "No restaurants found" message is displayed
    await waitFor(() => {
      expect(screen.getByText('No restaurants found')).toBeInTheDocument();
    });

    // Ensure that onSearchResults is called with an empty array
    expect(mockOnSearchResults).toHaveBeenCalledWith([]);
  });

  //test for selecting a restaurant from the search results
  test('should select restaurant from the search results', async () => {
    const mockOnSearchResults = jest.fn();

    render(
      <RestaurantSearch
        restaurantData={restaurantList}
        onSearchResults={mockOnSearchResults}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Search for restaurants...'
    );

    // Simulate typing into the search input
    fireEvent.change(inputElement, { target: { value: 'Mc' } });

    // Wait for the search results to appear
    await waitFor(() => {
      expect(screen.getByText("McDonald's")).toBeInTheDocument();
    });

    // Simulate clicking on a search result
    const resultItem = screen.getByText("McDonald's");
    fireEvent.mouseDown(resultItem);

    // Check that the input field is updated with the selected restaurant name
    expect(inputElement.value).toBe("McDonald's");

    // Ensure that onSearchResults is called with the selected restaurant
    expect(mockOnSearchResults).toHaveBeenCalledWith([
      expect.objectContaining({ resName: "McDonald's" }),
    ]);
  });
});
