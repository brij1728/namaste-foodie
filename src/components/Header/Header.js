import './Header.css';

import foodLogo from '../../../assets/food_logo.png';

export const Header = () => {
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
