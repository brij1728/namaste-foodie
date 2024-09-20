import React from 'react';
import ReactDOM from 'react-dom/client';
import foodLogo from './assets/food_logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={foodLogo} alt="logo" className="logo" />
      </div>
      <nav className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

const RestaurantCard = () => {
  return (
    <div className="restaurant-card">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/mar1zo0tz7rnlorlhkrt"
        alt="restaurant"
        className="restaurant-img"
      />
      <div className="card-content">
        <p className="card-title">Meghana Food</p>
        <p className="card-cuisine">Cuisine: South Indian</p>
        <p className="card-rating">
          <span>Rating: 4.5 </span>
          <span>• 38 mins</span>
        </p>
        <p className="card-address">123, Street Name, City, Country</p>
        <button className="order-now-button">Order Now</button>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button>Search</button>
      </div>
      <div className="restaurant-container">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copy-right">
        <p>&copy; 2021 Food App</p>
      </div>
      <div className="social-links">
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
      <div className="address">
        <p>123, Street Name, City, Country</p>
      </div>
      <div className="contact-us">
        <p>
          <span>Email:</span>
          <span>
            <a href="mailto:bk10895@gmail.com">bk10895@gmail.com</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
