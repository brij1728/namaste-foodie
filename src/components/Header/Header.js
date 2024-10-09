import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import foodLogo from '../../../assets/food_logo.png';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.items);
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const buttonName = isLoginOpen ? 'Logout' : 'Login';

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (!isLoginOpen) {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header w-full flex justify-between items-center">
      <div className="logo-container">
        <Link to="/">
          <img src={foodLogo} alt="logo" className="logo" />
        </Link>
      </div>
      <div
        className={`nav-items ${isMenuOpen ? 'active' : ''}`}
        data-testid="nav-items"
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="font-bold">
            <Link to="/cart">Cart ({totalCartItems})</Link>
          </li>
          <button onClick={toggleLogin}>{buttonName}</button>
        </ul>
      </div>
      <div
        aria-label="hamburger menu"
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        role="button"
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
