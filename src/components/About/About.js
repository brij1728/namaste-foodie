import React from 'react';

export const About = () => {
  return (
    <div className="about-container p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        About Namaste Foodie
      </h1>
      <div className="text-lg leading-8 text-gray-700 max-w-4xl mx-auto">
        <p className="mb-6">
          <strong>Namaste Foodie</strong> is an intuitive restaurant discovery
          platform designed to help users find the best dining options based on
          their location. Powered by the latest <strong>Swiggy API</strong>, the
          app delivers real-time restaurant and menu information, ensuring that
          users are always up to date with the latest food choices.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Live Restaurant Data:</strong> Fetches up-to-date restaurant
            listings and menu information using the Swiggy API.
          </li>
          <li>
            <strong>Location-Based Recommendations:</strong> Displays restaurant
            listings relevant to your current location.
          </li>
          <li>
            <strong>Custom Hooks & State Management:</strong> The app uses
            custom React hooks and Redux Toolkit for efficient state management
            and modular code.
          </li>
          <li>
            <strong>Lazy Loading & Shimmer UI:</strong> Optimized with lazy
            loading and a sleek shimmer effect for smooth loading experiences.
          </li>
          <li>
            <strong>Responsive Design:</strong> The app is designed with mobile
            and desktop users in mind, ensuring a seamless user experience
            across all devices.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Inspiration</h2>
        <p className="mb-6">
          The inspiration behind this app stems from{' '}
          <strong>Akshay Saini’s Namaste React</strong> series, a powerful
          learning resource that showcases how to build modern, scalable web
          applications using React. Namaste Foodie integrates many best
          practices from the series, including the use of hooks, context, and
          Redux Toolkit to build a performance-driven, scalable app.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>React:</strong> Frontend development framework for building
            dynamic user interfaces.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> Utility-first CSS framework for
            custom, responsive designs.
          </li>
          <li>
            <strong>Redux Toolkit:</strong> State management library for
            managing global app state.
          </li>
          <li>
            <strong>Parcel:</strong> Bundler for fast builds and hot module
            reloading during development.
          </li>
          <li>
            <strong>Jest & React Testing Library:</strong> Unit testing for
            components and logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">How it Works</h2>
        <p className="mb-6">
          Namaste Foodie works by integrating with Swiggy’s API to fetch
          restaurant data. The app uses a proxy to handle CORS issues, and Redux
          to manage the cart functionality. Restaurants are displayed based on
          user location, and the app supports lazy loading for optimal
          performance. You can browse restaurant menus, add or remove items
          to/from your cart, and experience seamless navigation between pages.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="mb-6">
          Our vision is to create an engaging, user-friendly platform where food
          lovers can easily discover new dining experiences. We aim to continue
          improving Namaste Foodie with features like user reviews, delivery
          tracking, and more.
        </p>

        <p className="text-center mt-10">
          <strong>Thank you for using Namaste Foodie! 🍽️</strong>
        </p>
      </div>
    </div>
  );
};

