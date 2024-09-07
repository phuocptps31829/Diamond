import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemSlice from './cartSlice';
import BookingSlice from './BookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: itemSlice,
    infoBooking: BookingSlice,
  },
});
