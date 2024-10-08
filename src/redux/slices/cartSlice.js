// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Creating the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store items added to the cart
  },
  reducers: {
    // Add item to the cart or increase its quantity
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the item already exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it to the cart with quantity = 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Remove item from the cart or reduce its quantity
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity > 1) {
        // If the quantity is more than 1, decrement it
        existingItem.quantity -= 1;
      } else {
        // Otherwise, remove the item from the cart
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Exporting actions for dispatching
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Selector to get items in the cart from the state
export const selectCartItems = (state) => state.cart.items;

// Exporting the reducer for the store configuration
export default cartSlice.reducer;
