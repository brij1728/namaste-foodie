import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { MenuItemCard } from './MenuItemCard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('MenuItemCard Component', () => {
  let store;
  let item = { id: 'pizza1', name: 'Pizza', price: 1000 };

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] }, // Simulating initial state of the Redux store
    });
    store.dispatch = jest.fn(); // Mocking dispatch function to track action dispatches
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
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: item,
    });
  });
});
