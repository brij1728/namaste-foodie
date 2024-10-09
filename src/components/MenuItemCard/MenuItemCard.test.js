import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { MenuItemCard } from './MenuItemCard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

const mockStore = configureStore([]);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('MenuItemCard Component', () => {
  let store;
  let item;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] }, // Simulating initial state of the Redux store
    });
    mockDispatch = jest.fn(); // Mocking dispatch function
    useDispatch.mockReturnValue(mockDispatch); // Mocking useDispatch to return the mocked dispatch

    // Set up a default item object for all tests
    item = {
      id: 'pizza1',
      name: 'Pizza',
      price: 1000,
      description: 'Delicious cheese pizza',
      itemAttribute: { vegClassifier: 'VEG' },
      offerTags: [{ title: 'Discount', subTitle: '10% off' }],
      ratings: { aggregatedRating: { rating: 4.5, ratingCountV2: 10 } },
      isCustomisable: true,
    };
  });

  test('dispatches addToCart action when "ADD" button is clicked', () => {
    render(
      <Provider store={store}>
        <MenuItemCard item={item} />
      </Provider>
    );

    // Click on the "ADD" button
    const addButton = screen.getByText('ADD');
    fireEvent.click(addButton);

    // Check that the addToCart action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: item,
    });
  });

  test('dispatches removeFromCart action when "-" button is clicked', () => {
    // Set the initial state of the store to simulate an item in the cart with a quantity of 2
    store = mockStore({
      cart: {
        items: [{ id: 'pizza1', name: 'Pizza', price: 1000, quantity: 2 }],
      },
    });

    render(
      <Provider store={store}>
        <MenuItemCard item={item} />
      </Provider>
    );

    // Click on the "-" button to remove an item
    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    // Check that the removeFromCart action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/removeFromCart',
      payload: item,
    });
  });

  test('does not dispatch removeFromCart action when quantity is 0', () => {
    // Set the initial state of the store to simulate an item in the cart with a quantity of 0
    store = mockStore({
      cart: {
        items: [{ id: 'pizza1', name: 'Pizza', price: 1000, quantity: 0 }],
      },
    });

    render(
      <Provider store={store}>
        <MenuItemCard item={item} />
      </Provider>
    );

    // Ensure the "ADD" button is present
    const addButton = screen.getByText('ADD');
    expect(addButton).toBeInTheDocument();

    // Ensure the "-" button is not present
    const removeButton = screen.queryByText('-');
    expect(removeButton).not.toBeInTheDocument();

    // Attempt to click the "ADD" button
    fireEvent.click(addButton);

    // Ensure that the addToCart action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: item,
    });

    // Ensure that removeFromCart action was not dispatched
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: 'cart/removeFromCart',
      payload: item,
    });
  });

  test('renders VEG indicator when vegClassifier is VEG', () => {
    const vegItem = { ...item, itemAttribute: { vegClassifier: 'VEG' } };

    render(
      <Provider store={store}>
        <MenuItemCard item={vegItem} />
      </Provider>
    );

    // Check if the green border (indicating VEG) is present
    const vegIndicator = screen.getByTestId('veg-indicator');
    expect(vegIndicator).toHaveClass('border-green-600');

    // Check for the inner green circle
    const innerCircle = vegIndicator.querySelector('.bg-green-600');
    expect(innerCircle).toBeInTheDocument();
  });

  test('renders NON-VEG indicator when vegClassifier is NON-VEG', () => {
    const nonVegItem = { ...item, itemAttribute: { vegClassifier: 'NON-VEG' } };

    render(
      <Provider store={store}>
        <MenuItemCard item={nonVegItem} />
      </Provider>
    );

    // Check if the red border (indicating NON-VEG) is present
    const nonVegIndicator = screen.getByTestId('veg-indicator');
    expect(nonVegIndicator).toHaveClass('border-red-600');

    // Check for the inner red circle
    const innerCircle = nonVegIndicator.querySelector('.bg-red-600');
    expect(innerCircle).toBeInTheDocument();
  });
});
