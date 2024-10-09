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
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 'pizza1', card: { info: { id: 'pizza1', name: 'Pizza' } } },
        ],
      },
    });

    jest.useFakeTimers(); // Use fake timers for testing delays

    // Mock window.confirm to always return true (simulate user clicking "OK")
    window.confirm = jest.fn().mockImplementation(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // Restore real timers after each test
  });

  test('displays "Your cart is empty" when the cart is empty', async () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Verify that the cart initially contains items
    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();

    const clearCartButton = screen.getByTestId('clear-cart');
    fireEvent.click(clearCartButton); // Click to clear the cart

    // Verify "Clearing..." is displayed
    expect(screen.getByText(/clearing/i)).toBeInTheDocument();

    // Advance the timers to simulate the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Update the store to simulate an empty cart
    store = mockStore({
      cart: {
        items: [],
      },
    });

    // Re-render with the updated store state
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Verify that "Your cart is empty" appears
    await waitFor(() => {
      expect(screen.queryByText(/clearing/i)).not.toBeInTheDocument();
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });
});
