import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemSlice from "./cartSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: itemSlice,
    infoBooking: bookingReducer,
  },
});
