// Footer.js
import './Footer.css';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section copy-right">
        <p>&copy; 2024 Food App</p>
      </div>
      <div className="footer-section social-links">
        <ul>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section address">
        <p>123, Street Name, City, Country</p>
      </div>
      <div className="footer-section contact-us">
        <p>
          <span>Email: </span>
          <span>
            <a href="mailto:bk10895@gmail.com">bk10895@gmail.com</a>
          </span>
        </p>
      </div>
    </footer>
  );
};
