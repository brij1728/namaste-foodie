import { RestaurantList } from './RestaurantList';
import { fetchRestaurantsAPI } from '../../api/fetchRestaurantsAPI';
import { render } from '@testing-library/react';
import { restaurantList } from '../../data/restaurantList';

// Mock the API call
jest.mock('../../api/fetchRestaurantsAPI');

it('Should render the RestaurantList Component with Search and Top Rated Button', () => {
  //Render the RestaurantList component to jsdom
  render(<RestaurantList />);
});
