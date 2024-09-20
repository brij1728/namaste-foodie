import {Footer, Header, RestaurantList, Search} from './components';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { restaurantList } from './data/restaurantList';

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Search />
      <RestaurantList restaurants={restaurantList}  />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
