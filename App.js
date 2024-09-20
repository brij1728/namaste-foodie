import React from 'react';
import ReactDOM from 'react-dom/client';
import foodLogo from './assets/food_logo.png';

/*
* Header Component
*   - Logo
*   - Nav Items
* Body
*  - Search
*  - Restaurant Container
*    - Restaurant Card
* Footer
*  - Copy Right
*  - Social Links
*  - Address
*  - Contact Us
*/ 

const Header = () => {
  return (
    <header>
      <div class="logo">
        <img src={foodLogo} alt="logo"  className=''/>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      {/* <Body />
      <Footer /> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout />);
