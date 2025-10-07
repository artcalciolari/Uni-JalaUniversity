import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import filterSlice from './slices/filterSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    filter: filterSlice,
    theme: themeSlice,
  },
});