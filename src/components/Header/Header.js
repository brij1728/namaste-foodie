import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import foodLogo from '../../../assets/food_logo.png';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate(); 
  
  // Subscribing to the cart items from the store
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const buttonName = isLoginOpen ? 'Logout' : 'Login';

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (!isLoginOpen) {
      navigate('/login'); // Correct usage of navigate
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
      <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
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
          <li className='font-bold'>
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>
          <button onClick={toggleLogin}>{buttonName}</button>
        </ul>
      </div>
      <div
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
