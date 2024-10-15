import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Copyright Section */}
        <div className="footer-section">
          <p className="text-lg text-gray-400">&copy; 2024 Namaste Foodie</p>
        </div>

        {/* Social Links Section */}
        <div className="footer-section">
          <h4 className="font-semibold text-lg mb-4 text-gray-100">
            Follow Us
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.linkedin.com/in/brijeshapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/brij.1728/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/bk10895"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        {/* Address Section */}
        <div className="footer-section">
          <h4 className="font-semibold text-lg mb-4 text-gray-100">
            Our Address
          </h4>
          <p>123, Street Name, Varanasi, India</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="font-semibold text-lg mb-4 text-gray-100">
            Contact Us
          </h4>
          <p>
            <span>Email: </span>
            <a
              href="mailto:bk10895@gmail.com"
              className="hover:text-green-400 transition-colors duration-200"
            >
              bk10895@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-600 pt-4">
        <p>Powered by Namaste Foodie</p>
      </div>
    </footer>
  );
};
