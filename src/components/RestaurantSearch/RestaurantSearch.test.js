import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RestaurantSearch } from './RestaurantSearch';
import { restaurantList } from '../../data/restaurantList';

describe('RestaurantSearch Component', () => {
  // Test for rendering the input field
  test('should render the input field', () => {
    render(
      <RestaurantSearch
        restaurantData={restaurantList}
        onSearchResults={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText(
      'Search for restaurants...'
    );
    expect(inputElement).toBeInTheDocument();
  });

  // Test for filtering restaurants based on search input
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

    fireEvent.change(inputElement, { target: { value: 'Pizza' } });

    await waitFor(() => {
      expect(screen.getByText('Pizza Hut')).toBeInTheDocument();
      expect(screen.getByText("Domino's Pizza")).toBeInTheDocument();
    });

    expect(screen.queryByText('Burger King')).not.toBeInTheDocument();
    expect(mockOnSearchResults).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ resName: 'Pizza Hut' }),
        expect.objectContaining({ resName: "Domino's Pizza" }),
      ])
    );
  });

  // Test for showing "No restaurants found" when no results match
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

    fireEvent.change(inputElement, {
      target: { value: 'NonExistentRestaurant' },
    });

    await waitFor(() => {
      expect(screen.getByText('No restaurants found')).toBeInTheDocument();
    });

    expect(mockOnSearchResults).toHaveBeenCalledWith([]);
  });

  // Test for selecting a restaurant from the search results
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

    fireEvent.change(inputElement, { target: { value: 'Mc' } });

    await waitFor(() => {
      expect(screen.getByText("McDonald's")).toBeInTheDocument();
    });

    const resultItem = screen.getByText("McDonald's");
    fireEvent.mouseDown(resultItem);

    expect(inputElement.value).toBe("McDonald's");
    expect(mockOnSearchResults).toHaveBeenCalledWith([
      expect.objectContaining({ resName: "McDonald's" }),
    ]);
  });

  // Test for showing all restaurants when the input is cleared
  test('should show all restaurants when the input is cleared', async () => {
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

    fireEvent.change(inputElement, { target: { value: 'Pizza' } });

    await waitFor(() => {
      expect(screen.getByText('Pizza Hut')).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => {
      expect(mockOnSearchResults).toHaveBeenCalledWith(restaurantList);
    });
  });

  // Test for handling case insensitivity in the search
  test('should handle case insensitivity in the search', async () => {
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

    fireEvent.change(inputElement, { target: { value: 'pizza' } });

    await waitFor(() => {
      expect(screen.getByText('Pizza Hut')).toBeInTheDocument();
    });

    expect(mockOnSearchResults).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ resName: 'Pizza Hut' }),
      ])
    );
  });

  // Test for input focus and blur behavior
  test('should display results when input is focused and hide when blurred', async () => {
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

    fireEvent.focus(inputElement);
    expect(screen.queryByText('No restaurants found')).not.toBeInTheDocument();

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(
        screen.queryByText('No restaurants found')
      ).not.toBeInTheDocument();
    });
  });
});
