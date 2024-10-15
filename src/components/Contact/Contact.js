import { FaEnvelope, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import React from 'react';

export const Contact = () => {
  return (
    <div className="contact-container p-8 bg-gray-100 min-h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Get in Touch
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-center text-lg text-gray-600 mb-6 leading-relaxed">
          I’d love to hear from you! Whether you have a question, feedback, or a
          collaboration idea, feel free to reach out via the following
          platforms:
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Email */}
          <a
            href="mailto:bk10895@gmail.com"
            className="flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 transition-all duration-200 p-5 rounded-lg shadow-lg w-full md:w-auto"
          >
            <FaEnvelope className="text-2xl text-[#1BA672] mr-3" />
            <span className="text-lg font-semibold text-gray-700">
              bk10895@gmail.com
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/brijeshapp/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 transition-all duration-200 p-5 rounded-lg shadow-lg w-full md:w-auto"
          >
            <FaLinkedin className="text-2xl text-[#0072b1] mr-3" />
            <span className="text-lg font-semibold text-gray-700">
              LinkedIn Profile
            </span>
          </a>

          {/* Twitter/X */}
          <a
            href="https://x.com/bk10895"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-400 transition-all duration-200 p-5 rounded-lg shadow-lg w-full md:w-auto"
          >
            <FaXTwitter className="text-2xl text-black mr-3" />
            <span className="text-lg font-semibold text-gray-700">
              Twitter Profile
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

