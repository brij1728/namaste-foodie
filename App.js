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

const RestaurantCard = (props) => {
  return (
    <div className="restaurant-card">
      <img src={props.image} alt={props.resName} className="restaurant-img" />
      <div className="card-content">
        <p className="card-title">{props.resName}</p>
        <p className="card-cuisine">{props.cuisine}</p>
        <p className="card-rating">
          <span>{props.rating} ★ </span>
          <span>{props.time}</span>
        </p>
        <p className="card-address">{props.address}</p>
        <button className="order-now-button">Order Now</button>
      </div>
    </div>
  );
};

const Body = () => {
const restaurants = [
  {
    resName: 'Burger King',
    cuisine: 'Burgers, American',
    rating: '4.4',
    time: '35-40 mins',
    address: 'Tasker Town, Shivaji Nagar',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/11/7f76a072-c1bc-4d74-ac56-33e0eea20c1e_5938.JPG',
  },
  {
    resName: 'Pizza Hut',
    cuisine: 'Pizzas',
    rating: '4.3',
    time: '35-40 mins',
    address: 'Richmond Town, Shanti Nagar',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/5b9c53df-e0cb-48fc-ac31-f02735592edc_10575.jpg',
  },
  {
    resName: 'Cream Stone Ice Cream',
    cuisine: 'Ice Cream, Desserts, Beverages',
    rating: '4.5',
    time: '40-45 mins',
    address: 'Frazer Town, Central Bangalore',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/9/88f0b679-8ab8-40e1-b742-65e3cf2e00c8_42577.jpg',
  },
  {
    resName: "McDonald's",
    cuisine: 'Burgers, Beverages, Cafe, Desserts',
    rating: '4.4',
    time: '25-30 mins',
    address: 'MG Road, Ashok Nagar',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/18/5e7991d9-6a0d-4034-82a9-59bd2bbdc0b3_43836.jpg',
  },
  {
    resName: "Domino's Pizza",
    cuisine: 'Pizzas, Italian, Pastas, Desserts',
    rating: '4.4',
    time: '20-25 mins',
    address: 'MG Road, Brigade Road',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/19/d34d7f08-005c-47d7-abcb-51e7dd790e09_23847.jpg',
  },
  {
    resName: 'Bakingo',
    cuisine: 'Bakery, Desserts, Beverages, Snacks',
    rating: '4.6',
    time: '25-30 mins',
    address: 'Puhlong X-road, Vasanth Nagar',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/8/5/4116f512-3b8d-4148-9f29-bfff041dca14_570511.JPG',
  },
  {
    resName: 'Samosa Party',
    cuisine:
      'Fast Food, Snacks, Beverages, Chaat, North Indian, Street Food, Sweets, Desserts, Punjabi, Bakery',
    rating: '4.6',
    time: '30-35 mins',
    address: 'Brigade Road, Brigade Road',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ixgxvfu6ggvw1w1awgr1',
  },
  {
    resName: 'Chaayos Chai+Snacks=Relax',
    cuisine:
      'Bakery, Beverages, Chaat, Desserts, Home Food, Italian, Maharashtrian, Snacks, Street Food, Sweets',
    rating: '4.6',
    time: '30-35 mins',
    address: 'Cunningham Road, Central Bangalore',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/4/17/dfbcecfc-b380-4648-930a-b9b56b21e781_435405.JPG',
  },
  {
    resName: 'The Pizza Bakery - Wood Fired Sourdough',
    cuisine: 'Pizzas, Pastas, Italian, Desserts, Continental',
    rating: '4.6',
    time: '30-35 mins',
    address: 'Church Street, Central Bangalore',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/0335dd45be555d0a4187255e57d2ca88',
  },
  {
    resName: 'Aubree',
    cuisine: 'Desserts, Bakery',
    rating: '4.6',
    time: '35-40 mins',
    address: 'Shivaji Nagar, Shivajinagar',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/65faa4b5046cb2215fe285a8b96c9bd7',
  },
  {
    resName: 'Pasta Street',
    cuisine: 'Italian, Pastas, Pizzas, Desserts',
    rating: '4.5',
    time: '30-35 mins',
    address: 'Cunningham Road, Cunningham Road',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/aecff12704ebe42606524c852f9ab0e4',
  },
];




  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button>Search</button>
      </div>
      <div className="restaurant-container">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            resName={restaurant.resName}
            cuisine={restaurant.cuisine}
            rating={restaurant.rating}
            time={restaurant.time}
            address={restaurant.address}
            image={restaurant.image}
          />
        ))}
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
