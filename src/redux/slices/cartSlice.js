import { createSlice } from '@reduxjs/toolkit';

// Creating the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initial state for cart items
  },
  reducers: {
    addToCart: (state, action) => {
      // Logic to add item to cart
      // mutating the state directly because we are using immer library internally which will take care of immutability for us automatically and will update the state immutably in the background 
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Logic to remove item from cart
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearToCart: (state) => {
      // Logic to clear the cart
      state.items.length = 0; // [] will not work here as it will create a new array reference and will not update the state, as you are not mutating the state directly or do with returning a empty array
      // return { ...state, items: [] }; // This will also work but not recommended as it will create a new object reference
	  
    },
  },
});

// Exporting actions for dispatching
export const { addToCart, removeFromCart, clearToCart } = cartSlice.actions;

// Selector to get items in the cart from the state
export const selectCartItems = (state) => state.cart.items;

// Exporting the reducer for the store configuration
export default cartSlice.reducer;
