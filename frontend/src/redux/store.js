import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: itemSlice
  },
});
