import './MenuItemCard.css';

import React from 'react';
import { domainImageURL } from '../../constants/apiURL';

export const MenuItemCard = ({ item }) => {
  const { name, defaultPrice, price, description, imageId, isCustomisable } =
    item.card.info;

  return (
    <li className="menu-item">
      <div className="menu-item-content">
        <h3>{name}</h3>
        <p className="price">₹{(defaultPrice || price) / 100}</p>
        <p>{description}</p>
      </div>
      <div className="menu-button">
        <img
          src={`${domainImageURL}/${imageId}`}
          alt={name}
          className="menu-item-image"
        />
        <button className="add-button">ADD</button>
        {isCustomisable && <p className="customisable-label">Customisable</p>}
      </div>
    </li>
  );
};
