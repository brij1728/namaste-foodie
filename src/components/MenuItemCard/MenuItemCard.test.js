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
  let item = { id: 'pizza1', name: 'Pizza', price: 1000 };
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] }, // Simulating initial state of the Redux store
    });
    mockDispatch = jest.fn(); // Mocking dispatch function
    useDispatch.mockReturnValue(mockDispatch); // Mocking useDispatch to return the mocked dispatch
  });

  test('renders "Add to Cart" button when quantity is 0', () => {
    render(
      <Provider store={store}>
        <MenuItemCard item={item} />
      </Provider>
    );

    // Ensure "Add to Cart" button is shown
    expect(screen.getByText('ADD')).toBeInTheDocument();
  });

  test('dispatches addToCart action when "Add to Cart" button is clicked', () => {
    render(
      <Provider store={store}>
        <MenuItemCard item={item} />
      </Provider>
    );

    const button = screen.getByText('ADD');
    fireEvent.click(button);

    // Check that addToCart action was dispatched with the correct item as the payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: item,
    });
  });

  test('renders quantity controls (+ and -) when item is in the cart', () => {
    // Updating the mock store to simulate the item already in the cart
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

    // Ensure that the quantity controls are rendered instead of the "ADD" button
    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity is shown
    expect(screen.getByText('+')).toBeInTheDocument(); // "+" button is shown
    expect(screen.getByText('-')).toBeInTheDocument(); // "-" button is shown
  });

  test('dispatches removeFromCart action when "-" button is clicked', () => {
    // Updating the mock store to simulate the item already in the cart
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

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    // Check that removeFromCart action was dispatched with the correct item as the payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/removeFromCart',
      payload: item,
    });
  });
});
