import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { appStore } from '../../redux/store';

it('Should render Header Component with login button', () => {
  //Render the Header component to jsdom
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //Assert that the Login button is present
  const loginButton = screen.getByRole('button', { name: 'Login' });

  //This is not a good way to test the button
  //   const loginButton = screen.getByText('Login');

  // Can use regex to test the cart items
  const cartItems = screen.getByText(/Cart/);

  expect(cartItems).toBeInTheDocument();
});

it('Should change login button to logout on Click', () => {
  //Render the Header component to jsdom
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //Assert that the Login button is present
  const loginButton = screen.getByRole('button', { name: 'Login' });
  
  //Click the Login button
  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole('button', { name: 'Logout' });

  //Assert that the Logout button is present
  expect(logoutButton).toBeInTheDocument();
});


//hwhjw4
