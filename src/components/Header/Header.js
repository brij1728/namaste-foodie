import './Header.css';

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
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
    return () => {
      setIsMenuOpen(false);
    };
  }, [buttonName]);

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
