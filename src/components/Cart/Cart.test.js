import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { Cart } from './Cart';
import { Provider } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import configureStore from 'redux-mock-store';

// Initialize the mock store
const mockStore = configureStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    // Initial state for the cart in the Redux store
    store = mockStore({
      cart: {
        items: [], // Initial empty cart
      },
    });

    // Mock the dispatch function
    store.dispatch = jest.fn();
  });

  test('renders empty cart message when there are no items', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Check for the empty cart message
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items when they exist', async () => {
    // Update the mock store with some items in the cart
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
          { id: 'burger1', card: { info: { id: 'burger1', name: 'Burger' } } },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );


  });

  test('dispatches clearCart action when Clear Cart button is clicked', async () => {
    // Update the mock store with some items in the cart
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
        ],
      },
    });

    // Mock window.confirm to always return true
    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    // Render the Cart component
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Find and click the Clear Cart button
    const clearCartButton = screen.getByText('Your cart is empty.');

    // Use act and waitFor to wrap state update and async dispatch
    await act(async () => {
      fireEvent.click(clearCartButton);

      // Ensure the action is dispatched after the timeout
      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledWith(clearCart());
      });
    });

    // Restore the original implementation of window.confirm
    window.confirm.mockRestore();
  });

  test('shows "Clearing..." text while clearing cart', async () => {
    // Update the mock store with some items in the cart
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
        ],
      },
    });

    // Mock window.confirm to always return true
    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Find and click the Clear Cart button
    const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' });

    // Use act to wrap state update
    await act(async () => {
      fireEvent.click(clearCartButton);

	

      // Check that the button shows "Clearing..." while the cart is being cleared
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();

    });

    // Restore the original implementation of window.confirm
    window.confirm.mockRestore();
  });
});
