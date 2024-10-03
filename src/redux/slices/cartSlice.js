import { createSlice } from '@reduxjs/toolkit';

// Creating the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initial state for cart items
  },
  reducers: {
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Find the item in the cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity > 1) {
        // If the item exists and its quantity is greater than 1, decrement its quantity
        existingItem.quantity -= 1;
      } else {
        // Otherwise, remove the item from the cart
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearToCart: (state) => {
      // Clear the cart by setting the items array to an empty array
      state.items.length = 0;
    },
  },
});

// Exporting actions for dispatching
export const { addToCart, removeFromCart, clearToCart } = cartSlice.actions;

// Selector to get items in the cart from the state
export const selectCartItems = (state) => state.cart.items;

// Exporting the reducer for the store configuration
export default cartSlice.reducer;
