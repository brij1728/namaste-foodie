import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import foodLogo from '../../../assets/food_logo.png';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.items);
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md w-full py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo-container flex items-center">
          <Link to="/">
            <img
              src={foodLogo}
              alt="Namaste Foodie Logo"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </Link>
          <Link to="/">
          <h1 className="ml-4 text-2xl font-bold text-gray-800">
            Namaste Foodie
          </h1>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cart ({totalCartItems})
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            aria-label="hamburger menu"
            className="hamburger flex flex-col justify-between w-6 h-6 focus:outline-none"
            onClick={toggleMenu}
          >
            <span className="block w-full h-1 bg-gray-800"></span>
            <span className="block w-full h-1 bg-gray-800"></span>
            <span className="block w-full h-1 bg-gray-800"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-10">
            <div className="flex flex-col space-y-4 p-6">
              <Link
                to="/"
                className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cart ({totalCartItems})
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
