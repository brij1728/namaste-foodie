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

const mockStore = configureStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });
    store.dispatch = jest.fn();
  });

  test('renders empty cart message when there are no items', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items when they exist', () => {
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
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
  });

  test('dispatches clearCart action when Clear Cart button is clicked', async () => {
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
        ],
      },
    });

    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' });

    await act(async () => {
      fireEvent.click(clearCartButton);

      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledWith(clearCart());
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
      });
    });

    window.confirm.mockRestore();
  });

  test('shows "Clearing..." text while clearing cart', async () => {
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
        ],
      },
    });

    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' });

    await act(async () => {
      fireEvent.click(clearCartButton);

      // While clearing, the button should show "Clearing..."
      expect(screen.getByText('Clearing...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
      });
    });

    window.confirm.mockRestore();
  });
});
