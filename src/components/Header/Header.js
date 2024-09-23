// Header.js
import './Header.css';

import React, { useEffect, useState } from 'react';

import foodLogo from '../../../assets/food_logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const buttonName = isLoginOpen ? 'Logout' : 'Login';

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    console.log('Header mounted');
    return () => {
      console.log('Header unmounted');
    };
  }, [buttonName]);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={foodLogo} alt="logo" className="logo" />
      </div>
      <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
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
