import './Header.css';

import React, { useState } from 'react';

import foodLogo from '../../../assets/food_logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  let buttonName = isLoginOpen ? 'Logout' : 'Login';
  
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('Header rendered');
  return (
    <header className="header">
      <div className="logo-container">
        <img src={foodLogo} alt="logo" className="logo" />
      </div>
      <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <button onClick={toggleLogin}>{buttonName}</button>
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
