import './RestaurantSearch.css';

import React, { useState } from 'react';

export const RestaurantSearch = ({ restaurantData, onSearchResults }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  // Handle input change and filter restaurants
  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    setIsResultsVisible(true);

    if (searchText.trim()) {
      const filteredResults = restaurantData.filter((restaurant) =>
        restaurant.resName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
      onSearchResults(filteredResults);
    } else {
      setSearchResults([]);
      onSearchResults(restaurantData); // Show all restaurants if search is empty
    }
  };

  // Handle result click (autocomplete)
  const handleResultClick = (result) => {
    setSearchText(result.resName);
    setIsResultsVisible(false);
    onSearchResults([result]); // Show the selected restaurant as the only result
  };

  console.log('RestaurantSearch rendered');

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for restaurants..."
        value={searchText}
        onChange={handleChange}
        onFocus={() => setIsResultsVisible(true)}
        onBlur={() => setTimeout(() => setIsResultsVisible(false), 100)} // Delay to allow clicking results
        className="search-input"
      />

      {isResultsVisible && searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((restaurant, index) => (
            <li
              key={index}
              className="search-result-item"
              onMouseDown={() => handleResultClick(restaurant)} // Prevent blur before selecting
            >
              {restaurant.resName}
            </li>
          ))}
        </ul>
      )}

      {isResultsVisible && searchResults.length === 0 && searchText && (
        <ul className="search-results">
          <li className="no-results">No restaurants found</li>
        </ul>
      )}
    </div>
  );
};
