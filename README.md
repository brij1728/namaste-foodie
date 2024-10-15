Here’s an updated **README** for your project that incorporates all the key features, including unit tests using Jest and React Testing Library:

---

# Namaste Foodie 🍽️

### A React-based Restaurant Discovery App

Namaste Foodie is a dynamic restaurant discovery application built using React, designed for seamless integration with Swiggy's live API. The app provides users with live restaurant data, optimized for performance and scalability, utilizing lazy loading, custom hooks, Redux for state management, and CORS Proxy to handle API requests efficiently. Inspired by Akshay Saini’s **Namaste React** series, this app is also equipped with unit tests to ensure code reliability.

### 🚀 Project Demo:
[Live App Link](https://namaste-react-neon-eta.vercel.app/)

### 📁 GitHub Repo:
[GitHub Repo Link](https://github.com/brij1728/namaste-react)

---

## Key Features ✨

1. **Swiggy API Integration:**  
   Fetches live restaurant and menu data using Swiggy's API, ensuring the app is always up to date.

2. **Location-based Restaurant Display:**  
   Shows restaurants based on the user’s current location for a more personalized experience.

3. **Lazy Loading:**  
   Optimizes performance by loading components only when required.

4. **Custom Hooks:**  
   Implements reusable custom hooks like `useRestaurantMenu` and `useOnlineStatus` for better code modularity and cleaner logic.

5. **Shimmer UI:**  
   Adds a skeleton loading effect (Shimmer) to enhance the user experience while waiting for API responses.

6. **Config-Driven UI:**  
   Allows for a flexible and easily customizable user interface, driven by config files.

7. **State Management with Redux Toolkit:**  
   Handles application-wide state management using Redux Toolkit, making the state predictable and easier to debug.

8. **Unit Testing with Jest & React Testing Library:**  
   Includes comprehensive unit tests using Jest and React Testing Library to ensure app stability and reliability.

9. **CORS Proxy Server:**  
   Implements a CORS proxy to solve cross-origin issues, enabling smooth communication with Swiggy's API.

---

## Tech Stack 🛠️

- **React 18**
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Parcel** for fast bundling
- **Babel** for JavaScript transpiling
- **Jest & React Testing Library** for unit testing
- **CORS Proxy** for handling API requests
- **Express.js** for the backend API

---

## Folder Structure 🗂️

```
namaste-react/
│
├── api/                        # API to interact with external services
│   ├── fetchRestaurantMenuAPI.js
│   └── fetchRestaurantsAPI.js
│
├── components/                 # Reusable React components
│   ├── MenuItemCard/
│   ├── RestaurantCard/
│   └── ShimmerRestaurantCard/
│
├── pages/                      # Main application pages
│   ├── Home.js
│   ├── RestaurantMenuPage.js
│   └── AboutPage.js
│
├── routes/                     # Application routes for Express.js
│   └── menuRoutes.js
│   └── restaurantRoutes.js
│
├── redux/                      # Redux slices for state management
│   └── slices/cartSlice.js
│
├── tests/                      # Unit tests
│   └── RestaurantList.test.js
│   └── MenuItemCard.test.js
│
├── server.js                   # Express server
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # Project documentation
```

---

## Getting Started 🏁

To get started with Namaste Foodie locally, follow these steps:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/brij1728/namaste-react
   ```

2. **Install Dependencies**  
   ```bash
   cd namaste-react
   npm install
   ```

3. **Start the Development Server**  
   ```bash
   npm start
   ```
   This will run the app in development mode. Open [http://localhost:1234](http://localhost:1234) to view it in your browser.

4. **Run Unit Tests**  
   ```bash
   npm run test
   ```

5. **Build for Production**  
   ```bash
   npm run build
   ```

6. **Run the Server in Production Mode**  
   ```bash
   npm run serve
   ```

---

## Available Scripts 📜

- `npm start`: Runs the app in development mode with Parcel.
- `npm run build`: Builds the app for production.
- `npm run serve`: Runs the Node.js server to serve the production build.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run format`: Formats the codebase using Prettier.
- `npm run test`: Runs the unit test suite using Jest and React Testing Library.
- `npm run test-watch`: Runs the test suite in watch mode for development.

---

## Unit Testing 🧪

This project uses **Jest** and **React Testing Library** for unit testing. The tests cover components like `MenuItemCard`, `RestaurantCard`, and the Redux store (`cartSlice`).

**Example Test (RestaurantList.test.js):**

```javascript
import { render, screen } from '@testing-library/react';
import RestaurantList from '../components/RestaurantList';
import mockRestaurantData from '../data/mockRestaurantData';

test('renders restaurant list correctly', () => {
  render(<RestaurantList data={mockRestaurantData} />);
  const restaurantElements = screen.getAllByTestId(/restaurant-name/i);
  expect(restaurantElements.length).toBe(mockRestaurantData.length);
});
```

---

## Screenshots 📸

**Restaurant Listing with Shimmer Effect:**

![Restaurant Listing](https://your-screenshot-url)

**Menu with Add/Remove Items:**

![Menu UI](https://your-screenshot-url)

---

## How to Contribute 🤝

We welcome contributions from the community! If you’d like to contribute:

1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b my-new-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:  
   ```bash
   git push origin my-new-feature
   ```
5. Create a new pull request.

---

## License 📄

This project is licensed under the **ISC License**.

---

Feel free to update the links to your screenshots, API URLs, and customize the sections as needed!

--- 

This README is comprehensive, provides clear instructions, and outlines the features, tech stack, and steps to get started with development. Let me know if you need further adjustments!
