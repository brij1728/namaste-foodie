import cartReducer from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
	  reducer: {
		cart: cartReducer,
	  },
});

