// src/components/Header/Header.test.js
import '@testing-library/jest-dom';

import { addToCart, clearCart } from '../../redux/slices/cartSlice'; // Import the correct actions
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { appStore } from '../../redux/store';

describe('Header Component', () => {
  beforeEach(() => {
    // Clear the cart before each test to start fresh
    appStore.dispatch(clearCart());
  });

  it('should render the Header component with the Login button', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Assert that the Login button is present
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();

    // Assert that the Cart link is present with 0 items
    const cartLink = screen.getByText(/Cart \(0\)/);
    expect(cartLink).toBeInTheDocument();
  });

  it('should toggle the login button to Logout on click', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Click the Login button
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    // Assert that the button changes to Logout
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
  });

  it('should display the correct number of items in the cart', () => {
    // Dispatch actions to add items to the cart
    appStore.dispatch(addToCart({ id: 'pizza1' }));
    appStore.dispatch(addToCart({ id: 'burger1' }));
    appStore.dispatch(addToCart({ id: 'pizza1' })); // Adding the same item again to increase quantity

    // Render the Header component
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Check that the Cart link shows the correct total number of items
    const cartItems = screen.getByText(/Cart \(3\)/); // 2 pizzas + 1 burger = 3 items in total
    expect(cartItems).toBeInTheDocument();
  });

  it('should toggle the menu open and closed on click', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Get the hamburger menu button
    const hamburgerMenu = screen.getByRole('button', {
      name: /hamburger menu/i,
    });

    // Select the nav-items container
    const navItems = screen.getByTestId('nav-items');

    // Initially, the nav-items should not have the 'active' class
    expect(navItems).not.toHaveClass('active');

    // Click the hamburger menu to open it
    fireEvent.click(hamburgerMenu);
    expect(navItems).toHaveClass('active');

    // Click the hamburger menu again to close it
    fireEvent.click(hamburgerMenu);
    expect(navItems).not.toHaveClass('active');
  });

  it('should navigate to the login page when the Login button is clicked', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Click the Login button
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    // Assert that the URL changes to /login
    expect(window.location.pathname).toBe('/login');
  });
});
